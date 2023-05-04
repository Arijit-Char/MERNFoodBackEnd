//jshint esversion:6
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const FeedBack = require("../models/FeedBack");
// const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
require('dotenv').config()
const bcrypt = require("bcryptjs"); //security
const jwt = require("jsonwebtoken"); //security
const jetSecret =process.env.JET_SECRET; //wrap it in n.env file

router.post(
  "/creatuser",
  [
    body("email").isEmail(),
    body("password", "incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10); //security
    let secPassword = await bcrypt.hash(req.body.password, salt); //security

    try {
      await User.create({
        name: req.body.name,
        password: secPassword, //security
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct data" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      ); //security compare and return true of false

      // if (req.body.password !== userData.password) {
      if (!pwdCompare) {
        //security
        return res.status(400).json({ errors: errors.array() });
      }

      const data = {
        user: {
          id: userData.id, //security
        },
      };

      const authToken = jwt.sign(data, jetSecret); //security

      return res.json({ success: true, authToken: authToken }); //security
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
router.post(
  "/feedbackuser",

  async (req, res) => {
    try {
      await FeedBack.create({
        name: req.body.name,
        feedback: req.body.feedback,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
