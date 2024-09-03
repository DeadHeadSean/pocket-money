const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
const authRoutes = require('./routes/auth.routes');
const transactionRoutes = require('./routes/transaction.routes');
const parentRoutes = require('./routes/parent.routes');
const userRoutes = require('./routes/user.routes');


app.use('/api/auth', authRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => { 
    res.json({ message: 'welcome to Pocket Money Tracker API'})
});

module.exports = app;