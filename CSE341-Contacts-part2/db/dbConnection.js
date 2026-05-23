const MongoClient = require('mongodb').MongoClient;
const dns = require('dns');

// Node.js DNS SRV resolution fails on some Windows configs; use Google DNS as fallback
dns.setServers(['8.8.8.8', '8.8.4.4']);

let _db;

const initDb = (callback) => {
    if(_db) {
        console.log('DB is already initialized!');
        return callback(null, _db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if(!_db) throw Error('DB not Initialized!');
    return _db;
}

module.exports = { initDb, getDb}