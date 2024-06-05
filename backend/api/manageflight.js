const express = require("express");
const router = express.Router();
const User = require("../authentication/User");

router.post("/manage-flights", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const filteredUser = { ...user._doc };
    delete filteredUser.password;
    res.status(200).json(filteredUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
