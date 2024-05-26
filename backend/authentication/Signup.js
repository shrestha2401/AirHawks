const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("./User");

router.post("/Signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    return res.status(400).json({ message: "Account already exists" });
  }

  const user = new User({
    name: name,
    email: email,
    password: password
  });
  await user.save();

  res.json({ message: "Success" });
});

module.exports = router;
