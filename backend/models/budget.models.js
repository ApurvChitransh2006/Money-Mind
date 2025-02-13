const mongoose = require('mongoose');

const categories = ['Food', 'Rent', 'Entertainment', 'Transport', 'Utilities', 'Savings', 'Other'];

const BudgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true, default: new Date().toISOString().slice(0, 7) }, // Example: "2025-02"
    category: { type: String, enum: categories, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Budget', BudgetSchema);
