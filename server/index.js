const express = require('express');
const connectDB = require('./db');
const app = require('./app');
const { scheduleWeeklyDeposit } = require('./scheduledTasks');

const port = process.env.PORT || 3001;

connectDB();
scheduleWeeklyDeposit();

app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
