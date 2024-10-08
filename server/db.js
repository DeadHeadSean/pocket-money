const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/pocket_money_tracker');
        console.log('mongoDB connected successfully');
    } catch (error) {
        console.error('mongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;