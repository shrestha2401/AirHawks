const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  flights_attended: { type: Number, default: 0 }, 
  flights_details: [{
    location: {
      code: { type: String, required: true },
      name: { type: String, required: true }
    },
    no_of_passengers:{
       type : Number,
       required : true,
    },
    destination: {
      code: { type: String, required: true },
      name: { type: String, required: true }
    },
    date: { type: Date, required: true },
    price_in_inr: { type: Number, required: true },
    non_stop: { type: Boolean, default: false },
    payment_receipt: { type: String }
  }] 
});

module.exports = mongoose.model("User", UserSchema);
