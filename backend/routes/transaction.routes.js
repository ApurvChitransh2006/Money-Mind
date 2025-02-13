// Creating the Transaction Route
const express = require('express')
const router = express.Router()

// Connecting the Transaction Models
const TransactionModel = require('../models/transaction.models')

// Creating a route for adding data to the Transaction DB
router.post('/', async (req, res) => {
    const { userId, type, ex_category, in_category, amount, description } = req.body
    try {
        const data = await TransactionModel.create({
            userId: userId,
            type: type,
            ex_category: ex_category,
            in_category: in_category,
            amount: amount,
            description: description,
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for getting data for a specific id from the Transaction DB
router.get('/:id', async (req, res) => {
    id = req.params.id
    try {
        const data = await TransactionModel.find({userId:id})
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for deleting the data in the Transaction DB
router.delete('/:id', async (req, res) => {
    id = req.params.id
    try {
        const data = await TransactionModel.findByIdAndDelete(id)
        res.status(200).json("Transaction Deleted Successfully")
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for updating a category Transaction data
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedTransaction = await TransactionModel.findByIdAndUpdate(
            id, { $set: updates }, // Use $set to update only the provided fields
            { new: true, runValidators: true } // Returns the updated document & ensures validation
        );
        res.status(200).json(updatedTransaction);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router