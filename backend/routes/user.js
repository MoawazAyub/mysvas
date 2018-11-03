const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,

      name: req.body.name,
      telephone: req.body.telephone,
      location: req.body.location,
      businessRole: req.body.businessRole,
      joiningReason: req.body.joiningReason,
      companyName: req.body.companyName,
      type: req.body.type,

      password: hash
    });
    console.log(user);
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed1"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed2"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id,name: fetchedUser.name,
           telephone: fetchedUser.telephone, location: fetchedUser.location,
            businessRole: fetchedUser.businessRole, joiningReason: fetchedUser.joiningReason,
          companyName: fetchedUser.companyName, type: fetchedUser.type },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed3"
      });
    });
});


module.exports = router;
