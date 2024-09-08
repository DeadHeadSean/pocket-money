const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');

exports.getBalance = async (req, res) => {
    try {
        const childId = req.user.userId;
        const child = await User.findById(childId);
        if (!child || child.role !== 'child') {
            return res.status(404).json({ message: 'Child account not found' });
        }
        res.json({ balance: child.balance });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ message: 'Error fetching balance', error: error.message });
    }
};

exports.getTransactionHistory = async (req, res) => {
    try {
        const ChildId = req.user.userId;
        const transactions = await Transaction.find({ childId }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        console.error('Error getching transaction history:', error);
        res.status(500).json({ message: 'Error fetching transaction history', error: error.message });
    }
};

exports.addExpense = async (req, res) => {
    try {
        const childId = req.user.userId;
        const { amount, description } = req.body;
        
        const child = await User.findById(childId);
        if (!child || child.role !== 'child') {
            return res.status(404).json({ message: 'Child account not found' });
        }
        /*
        if (child.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        */

        child.balance -= amount;
        await child.save();

        const transaction = new Transaction({
            childId,
            amount: -amount,
            type: 'expense',
            description
        });
        await transaction.save();

        res.json({message: 'הוצאה נופה בהצלחה', newBalance: child.balance });
    } catch (error) {
        console.error('Error adding expense', error);
        res.status(500).json({ message: 'Error adding expense', error: error.message});
    }
};

