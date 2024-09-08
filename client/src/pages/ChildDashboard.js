import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, Box, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const ChildDashboard = () => {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchUserInfo();
        fetchBalance();
        fetchTransactions();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get('/api/user/info');
            setAge(response.data.age);
        } catch (error) {
            console.error('Error fetching user info', error);
            setError('Failed to fetch user info');
        }
    };

    const fetchBalance = async () => {
        try {
            const response = await axios.get('/api/transactions/balance');
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error fetching balance', error);
            setError('Failed to fetch balance');
        }
    };

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transactions');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions', error);
            setError('Failed to fetch transactions');
        }
    };

    const addExpense = async () => {
        if(isNaN(amount) || amount <=0 ) {
            console.error('נא להזין סכום חיובי');
            return;
        }

        try {
            await axios.post('/api/transactions', { amount: -Number(amount), type: 'expense', description});
            setAmount('');
            setDescription('');
            setSuccess('הוצאה נוספה בהצלחה');
            fetchBalance();
            fetchTransactions();
        } catch (error) {
             console.error('בעיה בהוספת הוצאה', error);
             setError('Failed to add expense');
        }
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 2}}>לוח בקרה ילד</Typography>
            {age && <Typography variant="h5" sx={{ my: 2}}>גיל: {age}</Typography>}
            <Typography variant="h5" sx={{ my: 2 }}>דמי כיס : ₪{balance.toFixed(2)}</Typography>

            <Box sx={{ mb: 3 }}>
                <TextField
                    label="סכום"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="תיאור"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={addExpense} sx={{ mt: 2 }}>
                    הוסף הוצאה
                </Button>
            </Box>
            
            <Typography variant="h6" sx={{ mb: 2 }}>היסטורית פעולות</Typography>
            <List>
                {transactions.map((transaction) => (
                    <ListItem key={transaction._id}>
                        <ListItemText
                            primary={'₪${Math.abs(transaction.amount).toFixed(2)} - ${tranaction.descriprion}'}
                            secondary={`${transactions.type === 'expense' ? 'הכנסה' : 'הוצאה'} - ${new Date(transaction.date).toLocaleDateString()}`}
                        />
                    </ListItem>
                ))}
            </List>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setSuccess('')}>
                <Alert onClose={() => setSuccess('')} severity='success' sx={({ width: '100%' })}>
                    {success}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default ChildDashboard;