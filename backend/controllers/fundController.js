const Fund = require('../models/Fund');

exports.getAllFunds = async (req, res) => {
    try {
        const funds = await Fund.find();
        res.json(funds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
}

exports.createFund = async (req, res) => {
    const fund = new Fund(req.body);
    try {
        const newFund = await fund.save();
        res.status(201).json(newFund);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};