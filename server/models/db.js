const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/pocket_money_tracker', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('mongoDB connected');
    } catch (error) {
        console.error('mongoDB connection error:', error);
        process.exit(1);
    }
};