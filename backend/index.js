const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const loginRoutes = require("./authentication/Login.js");
const signupRoutes = require("./authentication/Signup.js");
const flightRouter = require('./api/flight.js');
const jwtPassword = "123456"; 
mongoose.connect(
  "mongodb+srv://admin:Airhawks123@airhawks-database.q7484wt.mongodb.net/user_info"
);
const flightDBConnection = mongoose.createConnection(
  "mongodb+srv://admin:Airhawks123@airhawks-database.q7484wt.mongodb.net/flights_db"
);
const app = express();
app.use(express.json());
app.use(cors());
app.use(loginRoutes);
app.use(signupRoutes);
app.use('/flights', flightRouter(flightDBConnection));
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
