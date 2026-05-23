require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const errorHandler = require('./middleware/errorHandler');
const app = express();


// Parsers 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CORS 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routes
app.use('/api/vulnerabilities', require('./routes/vulnerabilities'));
app.use('/api/programs', require('./routes/programs'));



// For 404 Not Found errors -----
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

module.exports = app;
