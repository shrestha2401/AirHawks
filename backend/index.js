const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require('cors');

const jwtPassword = "123456";
const loginRoutes = require("./authentication/Login.js");
const signupRoutes = require("./authentication/Signup.js");


mongoose.connect(
"mongodb+srv://admin:Airhawks123@airhawks-database.q7484wt.mongodb.net/user_info",
);

const app = express();
app.use(express.json());
app.use(cors()); 

// app.post("/Signup", async (req,res)=>{
  
// })
app.use(loginRoutes);
app.use(signupRoutes);
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});