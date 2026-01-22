// models/UserModel.js
const mongoose = require("mongoose");

const semesterRecordSchema = new mongoose.Schema({
  semesterNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
  subjects: [
    {
      name: {
        type: String,
        required: true,
      },
      creditHours: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
      grade: {
        type: String,
        required: true,
        enum: [
          "A+",
          "A",
          "A-",
          "B+",
          "B",
          "B-",
          "C+",
          "C",
          "C-",
          "D+",
          "D",
          "F",
        ],
      },
      gradePoints: {
        type: Number,
        default: 0,
      },
    },
  ],
  totalCreditHours: {
    type: Number,
    default: 0,
  },
  totalGradePoints: {
    type: Number,
    default: 0,
  },
  semesterGPA: {
    type: Number,
    default: 0,
    min: 0,
    max: 4.0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  Fullname: {
    type: String,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Semester: {
    type: Number,
  },
  profileImage: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
  },
  CMS: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    default: "",
  },
  currentCGPA: {
    type: Number,
  },
  totalCreditHoursCompleted: {
    type: Number,
    default: 0,
  },
  totalGradePointsEarned: {
    type: Number,
    default: 0,
  },
  semesterRecords: [semesterRecordSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


// Method to calculate GPA for a semester
UserSchema.methods.calculateSemesterGPA = function (semesterIndex) {
  const semester = this.semesterRecords[semesterIndex];
  if (!semester) return 0;

  const gradePoints = semester.subjects.reduce((total, subject) => {
    const gradeMap = {
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
    subject.gradePoints = gradeMap[subject.grade] || 0;
    return total + subject.gradePoints * subject.creditHours;
  }, 0);

  const totalCreditHours = semester.subjects.reduce(
    (total, subject) => total + subject.creditHours,
    0,
  );

  semester.totalGradePoints = gradePoints;
  semester.totalCreditHours = totalCreditHours;
  semester.semesterGPA =
    totalCreditHours > 0 ? gradePoints / totalCreditHours : 0;

  return semester.semesterGPA;
};

// Method to calculate overall CGPA
UserSchema.methods.calculateCGPA = function () {
  let totalGradePoints = 0;
  let totalCreditHours = 0;

  this.semesterRecords.forEach((semester) => {
    totalGradePoints += semester.totalGradePoints;
    totalCreditHours += semester.totalCreditHours;
  });

  this.totalGradePointsEarned = totalGradePoints;
  this.totalCreditHoursCompleted = totalCreditHours;
  this.currentCGPA =
    totalCreditHours > 0 ? totalGradePoints / totalCreditHours : 0;

  return this.currentCGPA;
};

module.exports = mongoose.model("User", UserSchema);
