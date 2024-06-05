require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const loginRoutes = require("./authentication/Login.js");
const signupRoutes = require("./authentication/Signup.js");
const flightRouter = require('./api/flight.js');
const paymentRoutes = require('./api/payment.js');
const bodyParser = require("body-parser");
const saveflightrouter = require('./api/saveflight.js')
const flightcountrouter = require('./api/updateflightattended.js')
const cancelticketrouter = require('./api/cancelticket.js')
const manageflightrouter = require('./api/manageflight.js')
mongoose.connect(process.env.MONGODB_URI);
const flightDBConnection = mongoose.createConnection(process.env.MONGODB_URI_ANOTHER);
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(loginRoutes);
app.use(signupRoutes);
app.use('/flights', flightRouter(flightDBConnection));
app.use(paymentRoutes);
app.use(saveflightrouter);
app.use(flightcountrouter);
app.use(manageflightrouter);
app.use(cancelticketrouter);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
