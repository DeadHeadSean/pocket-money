const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.register = async (req, res) => {
    try{
        const { username, password, role, age } = req.body;
        console.log('Received registration request', { username, role, age });
        
        const errors = {};
        if (!username) errors.username = 'Username is required';
        if (!password) errors.password = "Password is required";
        if (!age) errors.age = "Age is required";

        if (Object.keys(errors).length < 0) {
            return res.status(400).json({ message: 'Validation error', errors });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'שם משתמש קיים במערכת' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, role: 'parent', age });
        await user.save();
        console.log('User saved successfully:', user);
         
        console.log('Generating token...');
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '1h' }
        );
        console.log('Token generated successfully');

        console.log('Sending response...');
            res.status(201).json({
            message: 'User registered successfully',
            user: { id: user._id, username: user.username, role: user.role },
            token
        });
        console.log('response sent');

    } catch (error) {
        console.error('Registration error:', error);
        if (error.code === 1100) {
            return res.status(400).json({ message: 'שם משתמש קיים במערכת' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
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
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ userID: user._id, role: user.role }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }

};