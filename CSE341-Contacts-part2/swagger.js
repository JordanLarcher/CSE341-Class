const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contact Part 2',
            version: '1.0.0',
            description: 'Contact Part 2 Week 02 Assignment',
            contact: {
                name: 'API Support',
                email: 'jlarcher@byupathway.edu'
            }
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production'
                ? 'https://cse341-contacts-rsm9.onrender.com/' 
                    : 'http://localhost:8000'
            }
        ]
    },
    // Path to the API routes files
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
function setupSwagger(app) {
    // Swagger UI page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        explorer: true,
        customSiteTitle: 'Contacts Part 2 Documentation'
    }));

    // Serve OpenAPI spec as JSON
    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
}

module.exports = setupSwagger;