const express = require("express");
const router = express.Router();
const User = require("./User");
const authenticateToken = require('../api/jwtapi');

router.get("/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('name email');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
