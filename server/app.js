const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authMiddleware = require('./middleware/auth.middleware');
const parentController = require('./controllers/parent.controller');
const childController = require('./controllers/child.controller');

const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

//Parent 
app.get('/api/parent/children', authMiddleware, parentController.getChildren);
app.get('/api/parent/child/:childId/balance', authMiddleware, parentController.getChildBalance);
app.get('/api/parent/child/:childId/transactions', authMiddleware, parentController.getChildTransactions);
app.post('/api/parent/child/transaction', authMiddleware, parentController.addTransaction);
app.post('/api/parent/create-child', authMiddleware, parentController.createChild);

//Child routes
app.get('/api/child/balance', authMiddleware, childController.getBalance);
app.get('api/child/transactions', authMiddleware, childController.getTransactionHistory);
app.post('/api/child/add-expense', authMiddleware, childController.addExpense);

//Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;