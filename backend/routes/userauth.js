const express = require("express");
const User = require("../models/UserModel");
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const upload = require("../utils/multerconfig");
require("dotenv").config();

const JWT_Secure = process.env.JWT_SECRET;

// maping of grade to points
const GRADE_POINTS = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  F: 0.0,
};

// ROUTE 1: Createing User
router.post(
  "/createuser",
  [
    body("Fullname", "Enter proper name (min 2 characters)").isLength({
      min: 2,
    }),
    body("Semester", "Semester must be between 0 and 12").isInt({
      min: 0,
      max: 12,
    }),
    body("Email", "Enter a proper email").isEmail(),
    body("department"),
    body("CMS", "CMS must be numeric").isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { Fullname, Semester, Email, CMS, department } = req.body;

      // Check if user exists
      let user = await User.findOne({ Email });
      if (user) {
        return res.status(400).json({
          success: false,
          error: "User with this email already exists",
        });
      }

      // Check if user exists by CMS
      if (CMS) {
        user = await User.findOne({ CMS });
        if (user) {
          return res.status(400).json({
            success: false,
            error: "User with this CMS ID already exists",
          });
        }
      }

      // Create user
      user = await User.create({
        Fullname,
        Semester: parseInt(Semester),
        Email,
        CMS: Number(CMS),
        department,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_Secure, { expiresIn: "30h" });

      res.json({
        success: true,
        token: authtoken,
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Cannot create user due to error",
        message: error.message,
      });
    }
  },
);

// ROUTE 2: login User
router.post(
  "/login",
  [
    // validator of backend
    body("Email", "Enter proper email").isEmail(),
    body("CMS", "CMS must be numeric").isNumeric(),
  ],
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { Email, CMS } = req.body;
      let user = await User.findOne({ Email, CMS: Number(CMS) });
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "no user found with this Email or CMS" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_Secure, { expiresIn: "30h" });

      res.json({
        success: true,
        token: authtoken,
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Cannot create user due to error",
        message: error.message,
      });
    }
  },
);

// ROUTE 3: Add semester record
router.post(
  "/add-semester",
  fetchUser,
  [
    body("semesterNumber", "Semester number is required (1-10)").isInt({
      min: 1,
      max: 10,
    }),
    body("subjects", "Subjects array is required").isArray(),
    body("subjects.*.name", "Subject name is required").notEmpty(),
    body("subjects.*.creditHours", "Credit hours required (1-5)").isInt({
      min: 1,
      max: 5,
    }),
    body("subjects.*.grade", "Valid grade is required").isIn(
      Object.keys(GRADE_POINTS),
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { semesterNumber, subjects } = req.body;
      const userId = req.user.id;

      let user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      // Check if semester already exists
      const semesterExists = user.semesterRecords.some(
        (record) => record.semesterNumber === semesterNumber,
      );

      if (semesterExists) {
        return res.status(400).json({
          success: false,
          error: `Semester ${semesterNumber} already exists`,
        });
      }

      // Add new semester record
      user.semesterRecords.push({
        semesterNumber,
        subjects,
      });

      // Calculate semester GPA
      const semesterIndex = user.semesterRecords.length - 1;
      user.calculateSemesterGPA(semesterIndex);

      // Calculate overall CGPA
      user.calculateCGPA();

      await user.save();

      res.json({
        success: true,
        message: "Semester record added successfully",
        semesterGPA: user.semesterRecords[semesterIndex].semesterGPA,
        currentCGPA: user.currentCGPA,
        semesterRecord: user.semesterRecords[semesterIndex],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Cannot add semester record",
        message: error.message,
      });
    }
  },
);

// ROUTE 4: Update semester record
router.put("/update-semester/:semesterNumber", fetchUser, async (req, res) => {
  try {
    const { semesterNumber } = req.params;
    const { subjects } = req.body;
    const userId = req.user.id;

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Find the semester
    const semesterIndex = user.semesterRecords.findIndex(
      (record) => record.semesterNumber.toString() === semesterNumber,
    );

    if (semesterIndex === -1) {
      return res.status(404).json({
        success: false,
        error: `Semester ${semesterNumber} not found`,
      });
    }

    // Update subjects if provided
    if (subjects) {
      user.semesterRecords[semesterIndex].subjects = subjects;
    }

    // Recalculate semester GPA
    user.calculateSemesterGPA(semesterIndex);

    // Recalculate overall CGPA
    user.calculateCGPA();

    await user.save();

    res.json({
      success: true,
      message: "Semester record updated successfully",
      semesterGPA: user.semesterRecords[semesterIndex].semesterGPA,
      currentCGPA: user.currentCGPA,
      semesterRecord: user.semesterRecords[semesterIndex],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Cannot update semester record",
      message: error.message,
    });
  }
});

// ROUTE 5: Get all semester records
router.get("/semester-records", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select(
      "semesterRecords currentCGPA",
    );

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Sort semester records by semester number
    const sortedRecords = user.semesterRecords.sort(
      (a, b) => a.semesterNumber - b.semesterNumber,
    );

    res.json({
      success: true,
      currentCGPA: user.currentCGPA,
      totalSemesters: sortedRecords.length,
      semesterRecords: sortedRecords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Cannot fetch semester records",
      message: error.message,
    });
  }
});

// ROUTE 6: Delete semester record
router.delete(
  "/delete-semester/:semesterNumber",
  fetchUser,
  async (req, res) => {
    try {
      const { semesterNumber } = req.params;
      const userId = req.user.id;

      let user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      // Remove the semester
      user.semesterRecords = user.semesterRecords.filter(
        (record) => record.semesterNumber.toString() !== semesterNumber,
      );

      // Recalculate overall CGPA
      user.calculateCGPA();

      await user.save();

      res.json({
        success: true,
        message: "Semester record deleted successfully",
        currentCGPA: user.currentCGPA,
        remainingSemesters: user.semesterRecords.length,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Cannot delete semester record",
        message: error.message,
      });
    }
  },
);

// ROUTE 7: Get detailed user profile
router.get("/profile", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-Password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Calculate overall statistics
    const totalSubjects = user.semesterRecords.reduce(
      (total, semester) => total + semester.subjects.length,
      0,
    );

    const totalCreditHours = user.totalCreditHoursCompleted;

    // GPA progression
    const gpaProgression = user.semesterRecords
      .sort((a, b) => a.semesterNumber - b.semesterNumber)
      .map((semester) => ({
        semester: semester.semesterNumber,
        gpa: semester.semesterGPA,
        subjects: semester.subjects.length,
      }));

    res.json({
      success: true,
      profile: {
        id: user._id,
        Fullname: user.Fullname,
        Email: user.Email,
        Semester: user.Semester,
        CMS: user.CMS,
        department: user.department,
        profileImage: user.profileImage,
        currentCGPA: user.currentCGPA,
        totalCreditHoursCompleted: totalCreditHours,
        totalSubjectsCompleted: totalSubjects,
        totalSemesters: user.semesterRecords.length,
        createdAt: user.createdAt,
      },
      statistics: {
        gpaProgression,
        lastUpdated: user.updatedAt,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Cannot fetch profile",
      message: error.message,
    });
  }
});

// ROUTE 8: Update user profile
router.put(
  "/update-profile",
  fetchUser,
  [
    body("Fullname").optional().isLength({ min: 2 }),
    body("Semester").optional().isInt({ min: 1, max: 10 }),
    body("CMS").optional().isInt().withMessage("CMS must be a valid number"),
    body("department").optional().isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const userId = req.user.id;

      let user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      const newUser = {};

      if (req.body.Fullname !== undefined) {
        newUser.Fullname = req.body.Fullname;
      }
      if (req.body.Semester !== undefined) {
        newUser.Semester = req.body.Semester;
      }
      if (req.body.profileImage !== undefined) {
        newUser.profileImage = req.body.profileImage;
      }
      if (req.body.CMS !== undefined) {
        newUser.CMS = req.body.CMS;
      }
      if (req.body.department !== undefined) {
        newUser.department = req.body.department;
      }

      let UpdatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: newUser },
        { new: true },
      );

      res.json({
        success: true,
        message: "Profile updated successfully",
        UpdatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Cannot update profile",
        message: error.message,
      });
    }
  },
);

// ROUTE 9: Calculate GPA from marks
router.post(
  "/calculate-gpa",
  fetchUser,
  [
    body("subjects", "Subjects array is required").isArray(),
    body("subjects.*.name", "Subject name is required").notEmpty(),
    body("subjects.*.creditHours", "Credit hours required (1-5)").isInt({
      min: 1,
      max: 5,
    }),
    body("subjects.*.marks", "Marks required (0-100)").isInt({
      min: 0,
      max: 100,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { subjects } = req.body;

      // Convertign marks to grades
      const subjectsWithGrades = subjects.map((subject) => {
        let grade = "F";
        const marks = subject.marks;

        if (marks >= 85) grade = "A";
        else if (marks >= 80) grade = "A-";
        else if (marks >= 75) grade = "B+";
        else if (marks >= 70) grade = "B";
        else if (marks >= 65) grade = "B-";
        else if (marks >= 61) grade = "C+";
        else if (marks >= 58) grade = "C";
        else if (marks >= 55) grade = "C-";
        else if (marks >= 50) grade = "D";
        else if (marks <= 45) grade = "F";

        return {
          name: subject.name,
          creditHours: subject.creditHours,
          grade: grade,
          marks: marks,
        };
      });

      // Calculate GPA
      let totalGradePoints = 0;
      let totalCreditHours = 0;

      subjectsWithGrades.forEach((subject) => {
        const gradePoints = GRADE_POINTS[subject.grade] || 0;
        totalGradePoints += gradePoints * subject.creditHours;
        totalCreditHours += subject.creditHours;
      });

      const gpa =
        totalCreditHours > 0 ? totalGradePoints / totalCreditHours : 0;

      res.json({
        success: true,
        calculatedGPA: gpa.toFixed(2),
        totalCreditHours,
        subjects: subjectsWithGrades,
        gradePoints: GRADE_POINTS,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Cannot calculate GPA",
        message: error.message,
      });
    }
  },
);

// ROUTE 10: uplading profile pic
router.post(
  "/uploadprofilepic",
  upload.single("profileImage"),
  fetchUser,
  async (req, res) => {
    try {
      if (!req.file || !req.file.path) {
        return res
          .status(400)
          .json({ success: false, error: "Failed to upload profile picture" });
      }

      const userID = req.user.id;
      const profilepicPath = req.file.path;

      console.log("Cloudinary URL:", profilepicPath);

      const user = await User.findByIdAndUpdate(
        userID,
        { profileImage: profilepicPath },
        { new: true },
      );

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      res.json({
        success: true,
        message: "Profile picture uploaded successfully",
        user,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({
        success: false,
        error: "Cannot upload profile picture due to internal issues",
        message: error.message,
      });
    }
  },
);

module.exports = router;
