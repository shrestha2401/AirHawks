const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../authentication/User.js");

router.post("/save-flight", async (req, res) => {
    const { email, flights_details } = req.body;
    if (!email || !Array.isArray(flights_details)) {
        return res.status(400).json({ message: "Invalid input" });
    }
    // Ensure each flight detail has the necessary structure
    for (const flight of flights_details) {
        if (!flight.location || !flight.destination || !flight.date || typeof flight.price_in_inr !== 'number') {
            return res.status(400).json({ message: "Invalid flight details structure" });
        }
    }

    try {
        //  push new flight details
        const user = await User.findOneAndUpdate(
            { email: email },
            { 
                $push: { flights_details: { $each: flights_details } } // Add to flights_details array
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Flight details added successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
