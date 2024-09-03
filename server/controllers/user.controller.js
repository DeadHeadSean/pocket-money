const User = require('../models/user.model');

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if(!user) {
            return res.status(404).json({ message: 'לא נמצא משתמש' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user info', error: error.message });
    }
};