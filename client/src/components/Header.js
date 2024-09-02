import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    מעקב דמי כיס
                </Typography>
                {isLoggedIn ? (
                    <Button color="inherit" onClick={onLogout}></Button>
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">כניסה</Button>
                        <Button color="inherit" component={Link} to="/register">הרשמה</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
