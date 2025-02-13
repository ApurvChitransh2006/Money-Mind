const mongoose = require("mongoose");

// Creating a User Schema 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
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
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

// Converting the Schema into the Model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
