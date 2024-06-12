const mongoose = require("mongoose");
const flightSchema = require('./flightschema')
const express = require('express');
const router = express.Router();
module.exports = (flightDBConnection) => {
    router.post('/seat-dec', async (req, res) => {
      const { flightnumber } = req.body;
      try {
        const Flight = flightDBConnection.model('Flight', flightSchema);
        const flight = await Flight.findOne({ flightNumber: flightnumber });
  
        if (!flight) {
          return res.status(404).json({ message: "No flight found" });
        }
  
        if (flight.seats_available <= 0) {
          return res.status(400).json({ message: "No seats available" });
        }
  
        let ct = flight.seats_available;
        ct -= 1;
        flight.seats_available = ct;
        await flight.save();
  
        res.status(200).json({ message: "Seat decremented successfully", seats_available: flight.seats_available });
      } catch (err) {
        console.error("Error fetching flights:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  
    return router;
  };