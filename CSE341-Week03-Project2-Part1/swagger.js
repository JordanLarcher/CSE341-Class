const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Vulnerability Tracking API',
            description: 'API for tracking security programs and vulnerabilities.',
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
            },
            {
                name: 'Auth',
                description: 'Authentication endpoints'
            }
        ],
        components: {
            securitySchemes: {
                github_auth: {
                    type: 'oauth2',
                    flows: {
                        authorizationCode: {
                            authorizationUrl: 'https://github.com/login/oauth/authorize',
                            tokenUrl: 'https://github.com/login/oauth/access_token',
                            scopes: {
                                'user:email': 'Access to user email'
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
