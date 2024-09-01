const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    childID: { type: mongoose.Schema.type.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['הפקדה', 'הוצאה'], required: true },
    description: { type: String,default: 'דמי כיס שבועיים', required: true },
    date: { type: Date, default: Date.now } 
}, {timestamps: true });

module.exports = mongoose.model('Teanaction', transactionSchema);