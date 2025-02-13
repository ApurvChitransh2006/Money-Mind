// Creating the Contact Route
const express = require('express')
const router = express.Router()

// Connecting the Contact Models
const contactModel = require('../models/contact.models')

// Creating a route for adding data to the Contact DB
router.post('/', async (req, res) => {
    const { firstName, lastName, email, phoneNum, message } = req.body
    try {
        const data = await contactModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNum: phoneNum,
            message: message
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for getting data from the contact DB
router.get('/', async (req, res) => {
    try {
        const data = await contactModel.find()
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for deleting the data in the Contact DB
router.delete('/:id', async (req, res) => {
    id = req.params.id
    try {
        await contactModel.findByIdAndDelete(id)
        res.status(200).json("Contact Deleted Successfully")
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for updating contact data
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const newContact = await contactModel.findByIdAndUpdate(
            id,
            { $set: updates }, // Use $set to update only the provided fields
            { new: true, runValidators: true } // Returns the updated document & ensures validation
        );
        res.status(200).json(newContact);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router