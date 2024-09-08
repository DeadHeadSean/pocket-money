import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, Box, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import axios from 'axios';
import { getChildren, getChildBalance, getChildTransactions, addTransaction  } from '../services/parentService';

const ParentDashboard = () => {
    const [children, setChildren] = useState([]);
    const [newChildUsername, setNewChildUsername] = useState('');
    const [newChildPassword, setNewChildPassword] = useState('');
    const [newChildAge, setNewChildAge] = useState('');
    const [selectedChild, setSelectedChild] = useState(null);
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState('');
    const [description, setDescription] = useState('');
    const [transactionType, setTransactionType] = useState('income');


    useEffect (() => {
        fetchChildren();
    }, []);

    const fetchChildren = async () => {
        try {
            const response = await axios.get('/api/parent/children');
            setChildren(response.data);
        } catch (error) {
            console.error('Error fetching children:', error);
        }
    };

    const createChild = async () => {
        try {
            await axios.post('/api/parent/create-child', {
                username: newChildUsername, 
                password: newChildPassword, 
                age: Number(newChildAge) });
            setNewChildUsername('');
            setNewChildPassword('');
            setNewChildAge('');
            fetchChildren();
        } catch (error) {
            console.error('Error creating child:', error);
        }
    };

    const handleChildSelect = async (child) => {
        setSelectedChild(child);
        try {
            const balanceResponse = await axios.get(`/api/parent/child/${child._id}/balance`);
            const transactionsResponse = await axios.get(`/api.parent/child/${child._id}/transactions`);
            setSelectedChild({ ...child, balance: balanceResponse.data.balance });
            setTransactions(transactionsResponse.data);
        } catch (error) {
            console.error('Error fetching child data:', error);
        }
    };

    const addTransaction = async () => {
        if(!selectedChild) return;
        try {
            await axios.post('/api/parent/child/tranaction', {
                childId: selectedChild._id,
                amount: Number(amount),
                type: transactionType,
                description
            });
            setAmount('');
            setDescription('');
            setTransactionType('income');
            handleChildSelect(selectedChild);
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    /*
    const updateBalance = async () => {
        if(!selectedChild) return;
        try {
            await axios.post('/api/parent/update-balance', { childId: selectedChild._id, amount: Number(amount) });
            setAmount('');
            fetchChildren();
        } catch (error) {
            console.error('Error updating balance', error);
        }
    };
    */

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 2 }}>לוח בקרה הורים</Typography>
            <Box sx={{ mb: 3 }}>
                <TextField
                    lable="שם משתמש"
                    value={newChildUsername}
                    onChange={(e) => setNewChildUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="סיסמה"
                    type="password"
                    value={newChildPassword}
                    onChange={(e) => setNewChildPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="גיל"
                    type="number"
                    value={newChildAge}
                    onChange={(e) => setNewChildAge(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" onClick={createChild} sx={{ mt: 1 }}>
                    צור ילד
                </Button>
            </Box>

            <Typography variant="h5" sx={{ mb: 2 }}>ילדים</Typography>
            <List>
                {children.map((child) => (
                    <ListItem key={child._id} button onClick={() => handleChildSelect(child)}>
                        <ListItemText 
                            primary={`${child.username} (Age: ${child.age})`} 
                            secondary={`Balance: ₪${child.balance}`}
                        />
                    </ListItem>
                ))}
            </List>

            {selectedChild && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6">עדכון דמי הכיס של {selectedChild.username}</Typography>
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
                    <FormControl fullWidth margin="normal">
                        <InputLabel>סוג פעולה</InputLabel>
                        <Select
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value)}
                        >
                            <MenuItem value="income">הכנסה</MenuItem>
                            <MenuItem value="expense">הוצאה</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="primary" onClick={addTransaction} sx={{ mt: 1 }}>
                        הוסף פעולה
                    </Button> 

                <Typography variant="h6" sx={{ mt: 2 }}>היסטוריית פעולות</Typography>
                <List>
                    {transactions.map((transaction) => (
                        <ListItem key={transaction._id}>
                            <ListItemText
                                primary={`${transaction.type === 'income' ? 'הוצאה' : 'הכנסה'} ₪${Math.abs(transaction.amount)}`}
                                secondary={`${transaction.description} - ${new Date(transaction.createdAt).toLocaleDateString()}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
            )}
        </Container>
    )
};

export default ParentDashboard;