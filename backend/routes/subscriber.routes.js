// Creating the Subscriber Route
const express = require('express')
const router = express.Router()

// Connecting the Subscriber Models
const subscriberModel = require('../models/subscriber.models')

// Creating a route for adding data to the Subscriber DB
router.post('/', async (req, res) => {
    const { username, email } = req.body
    try {
        const data = await subscriberModel.create({
            username: username,
            email: email
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for getting data from the Subscriber DB
router.get('/', async (req, res) => {
    try {
        const data = await subscriberModel.find()
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for deleting the data in the Subscriber DB
router.delete('/:id', async (req, res) => {
    id = req.params.id
    try {
        await subscriberModel.findByIdAndDelete(id)
        res.status(200).json("Subscriber Deleted Successfully")
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for updating subscriber data
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedSubscriber = await subscriberModel.findByIdAndUpdate(
            id,
            { $set: updates }, // Use $set to update only the provided fields
            { new: true, runValidators: true } // Returns the updated document & ensures validation
        );
        res.status(200).json(updatedSubscriber);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router