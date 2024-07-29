const express = require('express');
const router = express.Router();
const db = require('./db'); // Assuming you have a separate db.js for your database connection

// Signup route
router.post('/signup', (req, res) => {
    const { email, username, password } = req.body;
    const sql = `INSERT INTO user_account (email, username, password) VALUES (?, ?, ?)`;
    db.query(sql, [email, username, password], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Error executing query', details: err });
        } else {
            res.status(201).json({ success: true, result: result });
        }
    });
});

module.exports = router;
