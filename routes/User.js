const express = require("express");
const router = express.Router();

const sendEmail = require("../utils/email");
const User = require("../models/User");

const {
  isNullInputField,
  isName,
  isEmail,
  isValidPassword,
  isValidBirthday
} = require("../utils/validators");

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res) => {
  const errors = {};

  if (isNullInputField(req.body.firstname)) {
    errors.firstnameError = "First name is required";
  } else if (!isName(req.body.firstname)) {
    errors.firstnameError = "First name can contain only alphabet characters";
  }

  if (isNullInputField(req.body.lastname)) {
    errors.lastnameError = "Last name is required";
  } else if (!isName(req.body.lastname)) {
    errors.lastnameError = "Last name can contain only alphabet characters";
  }

  if (isNullInputField(req.body.email)) {
    errors.emailError = "Email is required";
  } else if (!isEmail(req.body.email)) {
    errors.emailError = "Email is invalid";
  }

  if (isNullInputField(req.body.password)) {
    errors.passwordError = "Password is required";
  } else if (!isValidPassword(req.body.password)) {
    errors.passwordError =
      "Password needs to be from 8 to 32 characters with letters and numbers only";
  }

  if (isNullInputField(req.body.birthday)) {
    errors.birthdayError = "Birthday is required";
  } else if (!isValidBirthday(req.body.birthday)) {
    errors.birthdayError = "You need to be at least 18 to signup";
  }

  if (Object.keys(errors).length > 0) {
    res.render("signup", { ...errors, ...req.body });
  } else {
    const userInfo = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      birthday: new Date(req.body.birthday)
    };
    const user = new User(userInfo);
    user
      .save()
      .then(() => {
        console.log(`Successfully created user with email: ${userInfo.email}`);
        sendEmail(userInfo);
        res.redirect("/user/dashboard");
      })
      .catch(err => {
        console.log(
          `Cannot insert user with email ${userInfo.email} because:\n${err}`
        );

        // Duplicate error code is 11000
        if (err.code === 11000) {
          res.render("signup", {
            emailError: "Email is already used",
            ...req.body
          });
        }
      });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const errors = {};

  if (isNullInputField(req.body.email)) {
    errors.emailError = "Email is required";
  } else if (!isEmail(req.body.email)) {
    errors.emailError = "Email is invalid";
  }

  if (isNullInputField(req.body.password)) {
    errors.passwordError = "Password is required";
  } else if (!isValidPassword(req.body.password)) {
    errors.passwordError =
      "Password needs to be from 8 to 32 characters with letters and numbers only";
  }

  if (Object.keys(errors).length > 0) {
    res.render("login", { ...errors, ...req.body });
  } else {
    User.loginUser(req.body.email, req.body.password)
      .then(user => {
        res.redirect("/user/dashboard");
      })
      .catch(err => {
        console.log(`Something went wrong when login:\n${err}`);
        if (err.code === 2912) {
          res.render("login", {
            error:
              "Incorrect email or password. Type the correct email and password, and try again",
            ...req.body
          });
        } else {
          res.render("login", {
            error: "Server got some interal error. Please try again later",
            ...req.body
          });
        }
      });
  }
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
