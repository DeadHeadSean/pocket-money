const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type:String, enum: ['parent', 'child'], required: true},
    balance: { type: Number, default: 0 },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    age: { type: Number, min: 0, max: 120},

});

module.exports = mongoose.model('user', userSchema);