const express = require("express");
const router = express.Router();
const User = require("../authentication/User");

// Route to cancel a flight ticket
router.post("/cancel-ticket", async (req, res) => {
  const { email, paymentId } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });

    // If user not found, return 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the flight ticket in the user's flights_details array
    const flightIndex = user.flights_details.findIndex(flight => flight.payment_receipt === paymentId);

    // If flight not found, return 404
    if (flightIndex === -1) {
      return res.status(404).json({ message: "Flight ticket not found" });
    }

    // Remove the flight ticket from the array
    user.flights_details.splice(flightIndex, 1);

    // Save the updated user data
    await user.save();

    // Return success message
    res.status(200).json({ message: "Flight ticket canceled successfully" });
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
