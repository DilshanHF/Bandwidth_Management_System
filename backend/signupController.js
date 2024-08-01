const express = require('express');
const router = express.Router();
const db = require('./db'); // Assuming you have a separate db.js for your database connection

// Middleware to parse JSON bodies
router.use(express.json());

// Signup route
router.post('/api/signup', (req, res) => {
    console.log('Request Body:', req.body); // Log the request body

    const { email, userName, password } = req.body;
    if (!email || !userName || !password) {
        console.error('Validation error: Missing fields');
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = `INSERT INTO User_account (Email, userName, password) VALUES (?, ?, ?)`;
    db.query(sql, [email, userName, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Error executing query', details: err });
        }
        res.status(201).json({ success: true, result: result });
    });
});

module.exports = router;
