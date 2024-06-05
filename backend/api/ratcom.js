const express = require('express');
const router = express.Router();
const flightSchema = require('./flightschema'); 
module.exports = (flightDBConnection) => {
  router.post('/add-review', async (req, res) => { 
    const { name, flight_location, flight_destination, flight_name, starrating, comment } = req.body;

    if (!name || !flight_location || !flight_destination || !flight_name || !starrating || !comment) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const Flight = flightDBConnection.model('Flights', flightSchema); 
      const flight = await Flight.findOne({
        'location.code': flight_location,
        'destination.code': flight_destination,
        airline: flight_name
      });

      if (!flight) {
        return res.status(404).json({ error: "Flight not found" });
      }

      const newReview = {
        name,
        rating: starrating,
        comment
      };

      flight.reviews.push(newReview);
      await flight.save();

      res.status(200).json({ message: "Review added successfully", flight  });
    } catch (err) {
      console.error("Error adding review:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};
