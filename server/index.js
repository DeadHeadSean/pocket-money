const express = require('express');
const app = express();
const connectDB = require('./db');
const port = process.env.PORT || 3001;
const app = require('./app');
const { scheduleWeeklyDeposit } = require('./scheduledTasks');


connectDB();
scheduleWeeklyDeposit();

app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
