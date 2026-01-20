const express = require("express");
const User = require("../models/UserModel");
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_Secure = process.env.JWT_SECRET;

//ROUTE 1: creating a user using : POST '/api/auth/createuser. no login required
router.post(
  "/createuser",
  [
    body("Fullname", "Enter proper name").isLength({ min: "2" }),
    body("Semester", "Semeter must be 2 digit max").isLength({ max: "2" }),
    body("Email", "Enter a proper email").isEmail(),
    body("Password")
      .isLength({ min: 2 })
      .withMessage("must be at least 2 chars long"),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let success = false;

    // securing paswsword
    const salt = bcrypt.genSaltSync(10);
    const SecurePass = bcrypt.hashSync(req.body.Password, salt);

    try {
      const { Fullname, Semester, Email } = req.body;

      // checking if user exist with this email
      let user = await User.findOne({ Email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "user with this email already exist" });
      }

      // creating user and saving in mongoo
      user = await User.create({
        Fullname,
        Semester,
        Email,
        Password: SecurePass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      success = true;
      const authtoken = jwt.sign(data, JWT_Secure, { expiresIn: "30h" });
      res.json({ success, token: authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("cannot create user due to error");
    }
  },
);

//ROUTE 2: login user : POST '/api/auth/loginuser. no login required
router.post(
  "/login",
  [
    body("Email", "Enter a proper email").isEmail(),
    body("Password")
      .isLength({ min: 2 })
      .withMessage("must be at least 2 chars long"),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let success = false;
      const { Email, Password } = req.body;

      // checking if user exist with this email
      let user = await User.findOne({ Email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }

      // comparing password
      const passCompare = await bcrypt.compare(Password, user.Password);
      if (!passCompare) {
        return res.status(400).json({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_Secure, { expiresIn: "30h" });
      success = true;
      res.json({ success, token: authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).json("cannot login user due to error");
    }
  },
);

//ROUTE 3: get user : POST '/api/auth/getuser.  login required
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    let userID = req.user.id;
    let user = await User.findById(userID).select("-Password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("cannot get user due to error");
  }
});

//ROUTE 4: delete user : DELETE '/api/auth/deleteuser.  login required
router.delete("/deleteuser", fetchUser, async (req, res) => {
  try {
    let success = false;
    let userID = req.user.id;
    let user = await User.findByIdAndDelete(userID).select("-Password");

    if (!user) {
      res.status(401).json({ success, message: "user not found" });
    }
    success = true;
    res.json({ success, user, message: "User deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("cannot delete user duw to error");
  }
});

//ROUTE 5: upadate user : PUT '/api/auth/updateuser.  login required
router.put("/updateuser", fetchUser, async (req, res) => {
  try {
    let success = false;
    let userID = req.user.id;
    let user = await User.findById(userID).select("-password");

    if (!user) {
      res.status(401).json({ success, message: "user not found" });
    }

    const { Fullname, Semester, Email, Password } = req.body;
    const newUser = {};
    if (Fullname) {
      newUser.Fullname = Fullname;
    }
    if (Semester) {
      newUser.Semester = Semester;
    }
    if (Email) {
      newUser.Email = Email;
    }

    if (Password) {
      const salt = bcrypt.genSaltSync(10);
      const SecureUpdatedPass = bcrypt.hashSync(Password, salt);
      newUser.Password = SecureUpdatedPass;
    }

    user = await User.findByIdAndUpdate(
      userID,
      { $set: newUser },
      { new: true },
    );
    success = true;
    res.json({ success, user, message: "User updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("cannot update user duw to error");
  }
});

module.exports = router;
