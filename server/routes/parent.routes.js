const express = require('express');
const parentController = require('../controllers/parent.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/create-child', parentController.createChild);
router.get('/children', parentController.getChildren);
router.post('/update-balance', parentController.updateBalance);

module.exports = router;