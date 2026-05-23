const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Week 03 - Project 2 - Part 1 - Vulnerability Tracking API',
            description: 'An architectural REST engine delivering security research tracking parameters across corporate targets and system exposures.',
            version: '1.0.0',
            contact: {
                name: 'API Support',
                email: 'jlarcher@byupathway.edu'
            }
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                    ? 'https://cse341-class-rz9h.onrender.com'
                    : 'http://localhost:8000'
            }
        ],
        tags: [
            {
                name: 'Vulnerabilities',
                description: 'Vulnerability tracking endpoints'
            },
            {
                name: 'Programs',
                description: 'Bug bounty program endpoints'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
