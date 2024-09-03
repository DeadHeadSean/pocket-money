import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, Box } from '@mui/material';
import axios from 'axios';

const ParentDashboard = () => {
    const [children, setChildren] = useState([]);
    const [newChildUsername, setNewChildUsername] = useState('');
    const [newChildPassword, setNewChildPassword] = useState('');
    const [newChildAge, setNewChildAge] = useState('');
    const [selectedChild, setSelectedChild] = useState(null);
    const [amount, setAmount] = useState('');

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
            fetchChildren();
        } catch (error) {
            console.error('Error creating child:', error);
        }
    };

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

    return (
        <Container>
            <Typography variant="h4" sx={{ my: 2 }}>לוח בקרה הורים</Typography>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h5">יצירת ילד</Typography>
                <TextField
                    label="שם משתמש"
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
                />
            <Button variant="contained" color="primary" onClick={createChild} sx={{ mt: 1 }}>
                צור ילד</Button> 
            </Box>

            <Typography variant="h5" sx={{ mb: 2 }}>ילדים</Typography>
            <List>
                {children.map((child) => (
                    <ListItem key={child._id} button onClick={() => setSelectedChild(child)}>
                        <ListItemText primary={'${child.username} (Age: ${child.age})'} 
                        secondary={'Balance: ₪${child.balance}'} />
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
                        fullWidthmargin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={updateBalance} sx={{ mt: 1 }}>
                        עדכון דמי כיס</Button>    
                </Box>
            )}
        </Container>
    )
};

export default ParentDashboard;