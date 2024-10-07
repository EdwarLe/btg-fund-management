const Transaction = require('../models/Transaction');
const Fund = require('../models/Fund');
const notificationService = require('../services/notificationService');

let balance = 500000; // Initial balance of COP $500,000

exports.subscribe = async (req, res) => {
    try {
        const { fundId, amount, notificationType } = req.body;
        const fund = await Fund.findById(fundId);

        if (!fund) {
            return res.status(404).json({ message: 'Fund not found' });
        }

        if (amount < fund.minimumAmount) {
            return res.status(400).json({ message: `Minimum amount for this fund is ${fund.minimumAmount}` });
        }

        if (balance < amount) {
            return res.status(400).json({ message: `The available balance is insufficient to join the fund. ${fund.name}` });
        }

        const transaction = new Transaction({
            fundId,
            amount,
            type: 'subscription',
        });

        await transaction.save();
        balance -= amount;

        // Send notification
        await notificationService.sendNotification(notificationType, `Successfully subscribed to ${fund.name}`);

        res.status(201).json({ message: 'Subscription successful', transaction, balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.cancel = async (req, res) => {
    try {
        const { fundId, amount } = req.body;
        const fund = await Fund.findById(fundId);

        if (!fund) {
            return res.status(404).json({ message: 'Fund not found' });
        }

        const transaction = new Transaction({
            fundId,
            amount,
            type: 'cancellation',
        });

        await transaction.save();
        balance += amount;

        res.status(201).json({ message: 'Cancellation successful', transaction, balance });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTransactionHistory = async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 }).limit(10).populate('fundId');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBalance = (req, res) => {
    res.json({ balance });
};