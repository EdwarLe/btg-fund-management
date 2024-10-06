const express = require('express');
const router = express.Router();
const fundController = require('../controllers/fundController');

router.get('/', fundController.getAllFunds);
router.post('/', fundController.createFund);

module.exports = router;