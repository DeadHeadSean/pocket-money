const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/info', useController.getUsetInfo);

module.exports = router;