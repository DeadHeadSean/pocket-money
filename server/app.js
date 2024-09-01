const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const tranactionRoutes = require('./routes/transaction.routes');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();

//middleware
app.use(corse());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get('/', (req, res) => 
    res.json({ message: 'welcome to Pocket Money Tracker API'}));
app.use('/api/auth', authRoutes);
app.use('/api/transactions', authMiddleware, tranactionRoutes);
a

module.exports = app;