const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.post('/subscribe', transactionController.subscribe);
router.post('/cancel', transactionController.cancel);
router.get('/history', transactionController.getTransactionHistory);
router.get('/balance', transactionController.getBalance);

module.exports = router;