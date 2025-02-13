// Creating the User Route
const express = require('express')
const router = express.Router()

// Adding the library to hash the password
const bcrypt = require('bcrypt')

// Connecting the User Models
const userModel = require('../models/user.models')

// Creating a route for adding data to the User DB
router.post('/', async (req, res) => {
    const { username, email, password, isAdmin } = req.body
    const hashpass = await bcrypt.hash(password, 10)
    try {
        const data = await userModel.create({
            username: username,
            email: email,
            password: hashpass,
            isAdmin: isAdmin || false
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for getting data from the User DB
router.get('/', async (req, res) => {
    try {
        const data = await userModel.find()
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for deleting the data in the User DB
router.delete('/:id', async (req, res) => {
    id = req.params.id
    try {
        const data = await userModel.findByIdAndDelete(id)
        res.status(200).json("User Deleted Successfully")
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for updating user data
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { $set: updates }, // Use $set to update only the provided fields
            { new: true, runValidators: true } // Returns the updated document & ensures validation
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router