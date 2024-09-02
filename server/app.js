import React, {useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import ParentDashboard from '../client/src/pages/ParentDashboard';
import ChildDashboard from '../client/src/pages/ChildDashboard';


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const tranactionRoutes = require('./routes/transaction.routes');
const authMiddleware = require('./middleware/auth.middleware');
const parentRoutes = require('./routes/parent.routes');
const userRoutes = require('./routes/user.routes');

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
app.use('/api/parent', parentRoutes);
app.use('/api/user', userRoutes);


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogout = (userData) => {
        setIsLoggedIn(true);
        setUser(null);
    };

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            <Switch>
                <Route path="/register">
                {isLoggedIn ? <Redirect to="/" /> : <Register onRegister={() => setIsLoggedIn(true)} />}
                </Route>
                <Route path="/">
                {isLoggedIn ? (
                    user.role === 'parent' ? <ParentDashboard /> : <ChildDashboard />
                ) : (
                    <Redirect to="/login" />
                )}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

module.exports = app;