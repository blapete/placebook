const express = require("express");
const router = express.Router();
const passport = require("../../passport");
const db = require("../../models");
const User = require("../../models/user");
const userController = require("../../controllers/userController");

router.route("/signup").post((req, res) => {
  const { username, password, email } = req.body;

  // Validation
  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log("User.js post error: ", err);
    } else if (user) {
      res.json({
        error: `userTaken`,
      });
    } else {
      const newUser = new User({
        username: username,
        password: password,
        email: email,
      });
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        res.json(savedUser);
      });
    }
  });
});

router.route("/login").post(
  function (req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    db.Business.findOne({ ownerId: req.user._id })
      .then((result) => {
        var userInfo = {
          username: req.user.username,
          email: req.user.email,
          reservations: req.user.reservations,
          pastReservations: req.user.pastReservations,
          _id: req.user._id,
        };
        if (result === null) {
          res.json({
            type: "user",
            data: userInfo,
          });
        } else {
          res.json({
            type: "business",
            data: userInfo,
          });
        }
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  }
);

router.route("/user").get((req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

router.route("/logout").post((req, res) => {
  if (req.user) {
    req.logout();
    res.send({ message: "Logging out" });
  } else {
    res.send({ message: "No user to log out" });
  }
});

router
  .route("/reservation/delete/:id")
  .post(userController.deleteUserReservation);

router.route("/reservation/past/:id")
  .post(userController.pushPastReservation);

router.route("/reservation/user/:id")
  .post(userController.addUserReservation);

module.exports = router;
