const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type:String, enum: ['parent', 'child'], required: true},
    balance: { type: Number, default: 0 },
    age: { type: Number },

});

module.exports = mongoose.model('user', userSchema);