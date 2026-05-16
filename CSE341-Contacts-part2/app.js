require('dotenv').config();
const express =  require('express');
const app = express();
const setupSwagger = require('./swagger');




// Parse JSON Bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Z-KEY, Origin');

    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();

});

// Setup Swagger before routes
setupSwagger(app);
// Routes
app.use('/contacts', require('./routes/contact'));

// For 404 Not Found errors -----
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;

