import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material'; 
import { login } from '../services/auth';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(username, password);
            onLogin(data);
        } catch (error) {
            console.error('Login Failed', error);
            setError('Login failed. Please check your credentials and try again');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                כניסה
            </Typography>
            {error && (
                <Typography color="error" align="center" gutterBottom>
                    {error}
                </Typography>
            )}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary" fullwidth>
                    כניסה
                </Button>
            </form>
        </Container>
    );
};

export default Login;