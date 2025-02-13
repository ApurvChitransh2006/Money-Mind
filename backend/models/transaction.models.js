const mongoose = require('mongoose');

const ex_categories = ['Food', 'Rent', 'Entertainment', 'Transport', 'Utilities', 'Other'];
const in_categories = ['Salary', 'Pocket Money', 'Gifts', 'Other'];

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['income', 'expense'], required: true }, // Defines if it's income or expense
    ex_category: { type: String, enum: ex_categories },
    in_category: { type: String, enum: in_categories },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
