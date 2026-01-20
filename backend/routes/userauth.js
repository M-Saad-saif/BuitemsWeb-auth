const express = require("express");
const User = require("../models/UserModel");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

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
          .json({ error: "user with this email already exist" });
      }

      // creating user and saving in mongoo
      user = await User.create({
        Fullname,
        Semester,
        Email,
        Password: SecurePass,
      });

      res.json(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("cannot create user due to error");
    }
  },
);

module.exports = router;
