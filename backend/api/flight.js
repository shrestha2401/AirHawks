const mongoose = require("mongoose");
const flightSchema = require('./flightschema')
const express = require('express');
const router = express.Router();
module.exports = (flightDBConnection) => {
  router.get('/', async (req, res) => {
    try {
      const Flight = flightDBConnection.model('Flight', flightSchema);
      const flights = await Flight.find({});
      res.json(flights);
    } catch (err) {
      console.error("Error fetching flights:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }); 
  return router;
};
