const express = require('express');
const cors = require('cors');
const signupController = require('./signupController');

const app = express();
const PORT = 3000;

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Use signup controller
app.use('api/signup', signupController);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
