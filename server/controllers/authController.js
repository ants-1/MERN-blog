const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.sign_up = asyncHandler(async (req, res, next) => {
  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res
      .status(404)
      .json({ error: `Username: ${req.body.username} already exist.` });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      is_admin: req.body.is_admin,
      date_joined: req.body.date_joined,
    });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: "User could not be added." });
  }
});

exports.login = [
  passport.authenticate("local", { session: false }),
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: "Authentication Failed" });
    }

    jwt.sign({ user: user }, process.env.SECRET_KEY, (err, token) => {
      return res.status(200).json({
        message: "Authentication successful",
        token: token,
      });
    });
  }),
];

exports.logout = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(404).json({ error: "Unable to logout." });
    }
    res.status(200).json({ success: "Logout successful." });
  });
});
