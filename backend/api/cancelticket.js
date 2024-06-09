const express = require("express");
const router = express.Router();
const User = require("../authentication/User");
router.post("/cancel-ticket", async (req, res) => {
  const { email, paymentId } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const flightIndex = user.flights_details.findIndex(flight => flight.payment_receipt === paymentId);
    if (flightIndex === -1) {
      return res.status(404).json({ message: "Flight ticket not found" });
    }
    user.flights_details.splice(flightIndex, 1);
    await user.save();
    res.status(200).json({ message: "Flight ticket canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
