const cron = require('node-cron');
const User = reqiuire('./models/user.model');
const Transaction = require('./models/transaction.model')

const weeklyDeposit = async () => {
    try {
        const children = await User.find({ role: 'Child' });
        for (let child of children) {
            const depositAmount = child.age * 1;
            child.balance += depositAmount;
            await child.save();

            await Transaction.create({
                chilsId: child._id,
                amount: depositAmount,
                type: 'deposit',
                description: 'דמי כיס אוטו לפי גיל',
            });
        }
        console.log('הפקדה שבועית הושלמה');
    } catch (error) {
        console.error('Error during weekly deposit', error);
    }
};

const scheduleWeeklyDeposit = () => {
    cron.schedule('0 0 ** 0', weeklyDeposit);
};

module.exports = { scheduleWeeklyDeposit };