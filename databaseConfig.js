var MongoClient = require('mongodb').MongoClient;
const connectionURL = 'mongodb://AdibFrench:PasswordFrench101@ds253243.mlab.com:53243/learningfrench';
var db = {};
var dbInstance;

db.connect = function (callback) {
    MongoClient.connect(connectionURL, {useNewUrlParser: true}, function(err, db) {
        if (err) {
            console.log(err);
        } else{
            console.log('Connected to database');
            dbInstance = db.db('learningfrench');
            callback();
        }
    });
}

db.disconnect = function() {
    db.close();
    dbInstance = null;
}

db.getInstance = function() {
    return dbInstance;
}

module.exports = db;