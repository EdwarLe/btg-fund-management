const mongoose = require('mongoose');

const FundSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    minimumAmount: { type: Number, required: true },
    category: { type: String, required: true, enum: ['FPV', 'FIC'] },
});

module.exports = mongoose.model('Fund', FundSchema);