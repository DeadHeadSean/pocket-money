const express = require('express');
const transactionController = require('../controllers/transaction.controller');

const router = express.Router();

router.post('/', transactionController.addTransaction);
router.get('/:childId', transactionController.getTransactions);
router.get('/:childId/balance', transactionController.getBalance);

module.exports = router;