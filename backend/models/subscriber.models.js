const mongoose = require('mongoose');

// Creating a schema for storing subscriber data
const subscriberSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    }
}, { timestamps: true });

// Creating the model for the subscriber schema
const subscriberModel = mongoose.model('Subscriber', subscriberSchema);

module.exports = subscriberModel;
