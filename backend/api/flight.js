// Connection URI
// const express = require("express");
const mongoose = require("mongoose");
// const uri = "mongodb+srv://admin:Airhawks123@airhawks-database.q7484wt.mongodb.net/flights_db";
// Connect to MongoDB using mongoose
// router.connect(uri)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });
// Export router
// module.exports = router;
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
  // Define flight-related routes using flightDBConnection
  // Example route to fetch flights
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
