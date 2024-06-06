const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const express = require('express');
const router = express.Router();
const adminSchema = require('./adminschema.js');
const SALT_ROUNDS = 10;  
const jwt = require('jsonwebtoken');
const JWT_SECRET = '1234567'; 
module.exports = (adminDBConnection) => {
  router.post('/admin', async (req, res) => {
    const { email, password } = req.body;
    try {
      const Admin = adminDBConnection.model('admin', adminSchema);
      const admin_info = await Admin.findOne({ email });
      if (!admin_info) {
        return res.status(404).json({ error: "Admin not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, admin_info.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }
      const token = jwt.sign({ adminId: admin_info._id, name: admin_info.name }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: "Login successful", token });
    } catch (err) {
      console.error("Error fetching details:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Create admin
  router.post('/create-admin', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const Admin = adminDBConnection.model('admin', adminSchema);
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ error: "Admin with this email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const newAdmin = new Admin({
        name,
        email,
        password: hashedPassword
      });

      await newAdmin.save();
      res.status(201).json({ message: "Admin created successfully" });
    } catch (err) {
      console.error("Error creating admin:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};
