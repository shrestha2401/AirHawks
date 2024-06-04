const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../authentication/User.js");

router.post("/update-flightcount", async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "User not found" });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Increase the count of attended flights by 1
        user.flights_attended += 1;

        // Save the updated user
        await user.save();

        res.json({ message: "Flight count updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
