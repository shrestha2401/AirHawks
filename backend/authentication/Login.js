const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("./User");

router.post("/Login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }
  
  res.json({ message: "Login successful" });
});

module.exports = router;
