// Creating the Budget Route
const express = require('express')
const router = express.Router()

// Connecting the Budget Models
const BudgetModel = require('../models/budget.models')

// Creating a route for adding data to the Budget DB
router.post('/', async (req, res) => {
    const { userId, amount, category } = req.body
    try {
        const data = await BudgetModel.create({
            userId: userId,
            amount: amount,
            category: category
        })
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for getting data for a specific id from the Budget DB
router.get('/:id', async (req, res) => {
    id = req.params.id
    try {
        const data = await BudgetModel.find({userId:id})
        res.status(200).json(data)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for deleting the data in the Budget DB
router.delete('/:id', async (req, res) => {
    id = req.params.id
    try {
        const data = await BudgetModel.findByIdAndDelete(id)
        res.status(200).json("Budget Deleted Successfully")
    } catch (err) {
        res.status(400).json(err)
    }
})

// Creating a route for updating a category Budget data
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = req.body;
    try {
        const updatedBudget = await BudgetModel.findByIdAndUpdate(
            id, { $set: updates }, // Use $set to update only the provided fields
            { new: true, runValidators: true } // Returns the updated document & ensures validation
        );
        res.status(200).json(updatedBudget);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router