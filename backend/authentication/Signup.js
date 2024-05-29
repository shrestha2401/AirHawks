const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("./User");
const jwtPassword = "123456";
router.post("/Signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: "Account already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name: name,
    email: email,
    password: hashedPassword
  });
  await user.save();
  const token = jwt.sign({ userId: user._id }, jwtPassword, { expiresIn: '1h' });
  res.json({ message: "Success", token });
});
module.exports = router;
