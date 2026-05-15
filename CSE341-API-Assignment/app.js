require('dotenv').config();

const express = require('express');
const app = express();


// --- Middleware --------------

// Parse Json Bodies

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS -- Required since the fronted Html is opened from the filesystem
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Z-KEY, Origin');

    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();

});


// --- Static Frontend ---------

app.use(express.static('frontend'));


// --- Routes -----------------
// Retrieves all the professionals 
app.use('/professionals', require('./routes/professional'));

// --- For 404 Not Found -----------

app.use((req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

module.exports = app;