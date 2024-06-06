const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airLine : {type:String},
  flightNumber : {type : String},  
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
  non_stop: { type: Boolean, default: false },
  seats_available : {
     type : Number,
  },
  reviews: [{
    name: { type: String },
    rating: { type: Number },
    comment: { type: String }
  }]
}, { collection: 'flights-db' });

module.exports = flightSchema;
