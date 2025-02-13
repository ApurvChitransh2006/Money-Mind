const mongoose = require("mongoose");

// Creating a Contact Schema 
const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 3,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        minlength: 3,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    phoneNum: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Phone number must be exactly 10 digits"]
    },
    message: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 250
    }
}, { timestamps: true });

// Converting the Schema into the Model
const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;
