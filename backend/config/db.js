const mongoose = require('mongoose');

const connectToDb = async () => {

    try {
        // Connecting the Database to the MongoDB Atlas Database: Money Mind
        const MONGO_URI = process.env.MONGO_URI;
        const connection = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (err) {
        // Shows the error if connection not successful
        console.error(`Database connection error: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectToDb;
