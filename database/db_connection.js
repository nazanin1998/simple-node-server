import mongoose from 'mongoose';
var mongoDB = 'mongodb://127.0.0.1/babyDB';
let dbConnection;

var myDB = {
    connectToServer: function (callback) {
        mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(function (db, err) {
            if (err || !db) {
                return callback(err);
            }

            dbConnection = db;
            mongoose.set('runValidators', true);
            console.log('Successfully connected to MongoDB.');

            return callback();
        });
    },

    getDb: function () {
        return dbConnection;
    },
};

export default myDB;