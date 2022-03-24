import mongoose from 'mongoose';
let db;

var database = {
    connectToServer: function () {
        try {
            db = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
            if (!db) {
                return callback(err);
            }
            mongoose.set('runValidators', true);
            console.log('Successfully connected to MongoDB.');

        } catch (message) {
            console.log('MongoDb Connection lost, ');
            console.log(message)
        }
    },

    getDb: function () {
        return db;
    },
};

export default database;