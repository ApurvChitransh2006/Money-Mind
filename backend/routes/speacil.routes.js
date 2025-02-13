const express = require('express');
const mongoose = require('mongoose');
const Budget = require('../models/budget.models');
const Transaction = require('../models/transaction.models');

const router = express.Router();

router.get('/category-wise-data', async (req, res) => {
    try {
        const userId = req.query.userId; // Get userId from request

        // Aggregate Budget Data
        const budgets = await Budget.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $group: { _id: "$category", totalBudget: { $sum: "$amount" } } }
        ]);

        // Aggregate Expenses Data
        const expenses = await Transaction.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), type: "expense" } },
            { $group: { _id: "$ex_category", totalExpense: { $sum: "$amount" } } }
        ]);

        // Merge data
        const categoryData = {};
        budgets.forEach(b => categoryData[b._id] = { category: b._id, budget: b.totalBudget, expense: 0 });
        expenses.forEach(e => {
            if (categoryData[e._id]) {
                categoryData[e._id].expense = e.totalExpense;
            } else {
                categoryData[e._id] = { category: e._id, budget: 0, expense: e.totalExpense };
            }
        });

        res.json(Object.values(categoryData));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
