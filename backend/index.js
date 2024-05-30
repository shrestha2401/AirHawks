require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const loginRoutes = require("./authentication/Login.js");
const signupRoutes = require("./authentication/Signup.js");
const flightRouter = require('./api/flight.js');
const paymentRoutes = require('./api/payment.js');

mongoose.connect(process.env.MONGODB_URI);
const flightDBConnection = mongoose.createConnection(process.env.MONGODB_URI_ANOTHER);

const app = express();
app.use(express.json());
app.use(cors());
app.use(loginRoutes);
app.use(signupRoutes);
app.use('/flights', flightRouter(flightDBConnection));
app.use(paymentRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
