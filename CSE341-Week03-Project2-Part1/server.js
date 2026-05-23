const mongoose = require('mongoose');
const app = require('./app');
const { initDb } = require('./config/db');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Mongoose connected'))
    .catch((err) => {
        console.error('Mongoose connection failed:', err);
        process.exit(1);
    });

initDb((error) => {
    if (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

});
