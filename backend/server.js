const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Ijse@123',
    database: 'bandwidthSystem'
};

let db;

function handleDisconnect() {
    db = mysql.createConnection(dbConfig);

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to Database:', err);
            setTimeout(handleDisconnect, 2000); // Reconnect after 2 seconds if the initial connection fails
        } else {
            console.log('Connection established');
        }
    });

    db.on('error', (err) => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
            handleDisconnect(); // Reconnect on connection loss or fatal error
        } else {
            throw err;
        }
    });
}

handleDisconnect();

app.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO User_account (Email, userName, password) VALUES (?, ?, ?)`;
        db.query(sql, [email, username, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error executing query:', err);
                res.status(500).send({ success: false, message: 'Sign Up Failed', error: err });
            } else {
                res.status(201).send({ success: true, message: 'Sign Up Successful' });
            }
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).send({ success: false, message: 'Sign Up Failed', error: err });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM User_account WHERE Email = ?`;
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send({ success: false, message: 'Login Failed', error: err });
        } else if (results.length === 0) {
            res.status(401).send({ success: false, message: 'Invalid email or password' });
        } else {
            const user = results[0];
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            console.log('password is valid:', passwordIsValid);
            if (passwordIsValid) {
                res.status(200).send({ success: true, message: 'Login Successful' });
            } else {
                res.status(401).send({ success: false, message: 'Invalid email or password' });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
