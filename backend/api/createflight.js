const mongoose = require("mongoose");
const flightSchema = require('./flightschema')
const express = require('express');
const router = express.Router();
module.exports = (flightDBConnection) => {
router.post('/create-flight', async (req, res) => {
    const {
      airLine,
      flightNumber,
      locationName,
      locationCode,
      destinationName,
      destinationCode,
      date,
      price_in_inr,
      non_stop,
      seats_available
    } = req.body;

    try {
      const Flight = flightDBConnection.model('Flight', flightSchema);
      const newFlight = new Flight({
        airLine,
        flightNumber,
        location: {
          name: locationName,
          code: locationCode
        },
        destination: {
          name: destinationName,
          code: destinationCode
        },
        date,
        price_in_inr,
        non_stop,
        seats_available
      });
      await newFlight.save();
      res.status(201).json({ message: "Flight created successfully" });
    } catch (err) {
      console.error("Error creating flight:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  return router;
}