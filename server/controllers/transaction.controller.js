const Transaction = require('../models/tranaction.model');
const User = require('../models/user.model');

exports.addTransaction = async (req, res) => {
    try {
        const { childId, amount, type, description } = req.body;
        const transaction = new Transaction({ childID, amount, type, description });
        await transaction.save();

        //Update child's balance
        const child = await User.findById(childId);
        if(!child) {
            return res.status(404),json({ message: 'Child not found' });
        }
        child.balance = (child.balance || 0) + (type === 'הפקדה' ? amount : - amount);
        await child.save();

        res.status(201).json({ message: 'ההעברה בוצעה בהצלחה!', Transaction });
    } catch (error) {
        res.status(500).json({ message: 'Error adding transaction', error: error.message});
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const { childId } = req.params;
        const transactions = await Transaction.find({ childId }).sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json ({ message: 'Error fetching transactions', error: error.message });
    }
};

exports.getBalance = async (req, res) => {
    try {
        const { childId } = req.params;
        const child = await User.findById(childId);
        if(!child) {
            return res.status(404).json({ message: 'Child not found', error: error.message });
        }
        res.json({ balance: child.balance || 0 });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching balance', error: error.message });
    }
};