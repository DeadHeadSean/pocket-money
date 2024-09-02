import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { register } from '../services/auth';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('ילד');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, password, age, role);
            onRegister();
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                הרשמה
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="שם משתמש"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="סיסמה"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="גיל"
                    fullWidth
                    margin="normal"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-select-label">סוג משתמש</InputLabel>
                    <Select
                        labelId="role-select-label"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <menuitem value="child">ילד</menuitem>
                        <menuitem value="parent">הורה</menuitem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    הירשם
                </Button>
            </form>
        </Container>
    );
};

export default Register;