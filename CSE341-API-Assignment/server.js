//require('dns').setServers(['8.8.8.8', '1.1.1.1']);

const app = require('./app');
const { initDb } = require('./db/connect');

const PORT = process.env.PORT || 3000;

initDb((err) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
