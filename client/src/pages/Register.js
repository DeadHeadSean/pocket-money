import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { register } from '../services/auth';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [role, setRole] = useState('parent');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const ageNumber = parseInt(age, 10);
            if (isNaN(ageNumber)) {
                throw new Error('גיל חייב להיות מספר');
            }
            const user = await register(username, password, 'parent', ageNumber);
            console.log('registrartion successfull!')
            onRegister(user);
        } catch (error) {
            console.error('Registration failed', error);
            if (error.response?.data?.errors) {
                const errorMessage = Object.values(error.response.data.errors).join(', ');
                setError(`Registration failed: ${errorMessage}`);
            } else {
                setError(error.response?.data?.message || error.message ||'Registration failed. please try again');
            }
        }
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                הרשמה
            </Typography>
            {error && (
                <Typography color="error" align="center">
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
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    הירשם
                </Button>
            </form>
        </Container>
    );
};

export default Register;