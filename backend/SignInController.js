const express = require('express');
const router = express.Router();
const db = require('./db');// Assuming you have a separate db.js for your database connection

// Middleware to parse JSON bodies
router.use(express.json());