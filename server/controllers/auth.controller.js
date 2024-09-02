const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async (req, res) => {
    try{
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role });
        await user.save();
        res.status(201),json({ message: 'User registered successfully' });
    
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });

    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const isPasswordValid = await bcrypt.cpmpare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication faoiled' });
        }
        const token = jwt.sign({ userID: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }

};