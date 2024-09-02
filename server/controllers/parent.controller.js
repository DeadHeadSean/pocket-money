const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');


exports.createChild = async (req, res) => {
    try {
        const { username, password, age } = req.body;
        const child = new User ({
            username,
            password,
            role: 'child',
            parent: req.user.userId,
            age
        });
        await child.save();
        res.status(201).json({ message: 'חשבון ילד נוצר בהצלחה!', childId: child_id });
    } catch (error) {
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
