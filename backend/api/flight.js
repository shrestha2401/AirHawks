const mongoose = require("mongoose");
const flightSchema = new mongoose.Schema({
  location: {
    code: { type: String, required: true },
    name: { type: String, required: true }
  },
  destination: {
    code: { type: String, required: true },
    name: { type: String, required: true }
  },
  date: { type: Date, required: true },
  price_in_inr: { type: Number, required: true },
  non_stop: { type: Boolean, default: false }
},{ collection: 'flights-db' }); 
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
