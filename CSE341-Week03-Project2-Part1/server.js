require('dotenv').config();
const app = require('./app');
const { initDb } = require('./config/db');

const PORT = process.env.PORT || 8000;

initDb((error) => {
    if (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});