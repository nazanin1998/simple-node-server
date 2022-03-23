import mongoose from 'mongoose';
let dbConnection;

var myDB = {
    connectToServer: function (callback) {
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(function (db, err) {
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