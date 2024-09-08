const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Username is required'], 
        unique: true,
        trim: true
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
    },
    role: { 
        type:String, 
        enum: ['parent', 'child'], 
        required: true,
        default: 'parent'
    },
    balance: { 
        type: Number, 
        default: 0, 
    },
    parent: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        default: null 
    },
    age: { 
        type: Number,
        required: true,
        min: [0, 'גיל חייב להיות מספר חיובי'],
        max: [120, 'גיל חייב להיות קטן שווה ל-120']
    },
}, {
    timestamps: true
});

userSchema.pre('save', function(next) {
    if (this.role === 'child' && !this.parent) {
        const err = new Error('לילד חייב להיות הורה');
        next(err);
    } else {
        next();
    }
});

module.exports = mongoose.model('user', userSchema);