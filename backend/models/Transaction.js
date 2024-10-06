const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    fundId: { type: mongoose.Schema.Types.ObjectId, ref: 'Fund', required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true, enum: ['subscription', 'cancellation'] },
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', TransactionSchema);