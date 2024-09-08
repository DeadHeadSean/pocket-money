const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');


exports.createChild = async (req, res) => {
    try {
        const { username, password, age } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const child = new User ({
            username,
            password: hashedPassword,
            role: 'child',
            parent: req.user.userId,
            age
        });
        await child.save();
        res.status(201).json({ message: 'חשבון ילד נוצר בהצלחה!', childId: child._id });
    } catch (error) {
        console.error('Error creating child account', error);
        res.status(500).json({ message: 'Error creating child account', error: error.message });
    }
};

exports.getChildren = async (req, res) => {
    try {
        const children = await User.find ({ parent: req.user.userId });
        res.json(children);
    } catch (error) {
        res.status(500).json({ message: 'Error fatching children', error: error.message });
    }
};


exports.getChildBalance = async (req, res) => {
    try {
        const { childId } = req.params;
        const child = await User.findOne({ _id: childId, parent: req.user.userId });
        if (!child) {
            return res.status(404).json({ message: 'Child not found' });
        }
        res.json({ balance: child.balance });
    } catch (error) {
        res.status(500).json({ message: 'Error getching child balance', error: error.message });
    }
};

exports.getChildTransactions = async (req, res) => {
    try {
        const { childId } = req.params;
        const child = await User.findOne({ _id: childId, parent: req.user.userId });
        if (!child) {
            return res.status(404).json({ message: 'Child not found' });
        }
        const transactions = await Transaction.find({ childId }).sort({ createdAt: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching child transactions', error: error.message });
    }
};

exports.addTransaction = async (req, res) => {
    try {
        const { childId, amount, type, description } = req.body;
        const child = await User.findOne({_id: childId, parent: req.user.userId });
        if (!child) {
            return res.status(404).json({message: 'Child not found'});
        }
        /*
        if (type === 'expense' && child.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }
        */

        child.balance += type === 'income' ? amount : -amount;
        await child.save();

        const transaction = new Transaction({
            childId,
            amount: type === 'income' ? amount : -amount,
            type,
            description
        });
        await transaction.save();

        res.json({ message: 'Transaction added successfullly', newBalance: child.balance });
    } catch (error) {
        res.status(500).json({ nessage: 'Error adding transaction', error: error.message });
    }
}

exports.updateBalance = async (req, res) => {
    try {
        const { childId, amount } = req.body;
        const child = await User.findById(childId);
        if(!child || child.parent.toString() !== req.user.userId) {
            return res.status(404).json({ message: 'הילד לא נמצא' });
        }
        child.balance += amount;
        await child.save();

        const transaction = new Transaction({
            childId,
            amount,
            type: amount > 0 ? 'deposit' : 'expense',
            description: 'עדכון דמי כיס עי הורה',
        });
        await transaction.save();

        res.json({ message: 'דמי כיס עודכנו בהצלחה', newBalance: child.balance });
    } catch (error) {
        res.status(500).json({ message: 'תקלה בעדכון דמי כיס', error: error.message  });
    }
};
