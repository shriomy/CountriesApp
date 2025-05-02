import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: 'primary.main'
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        fontWeight: 800,
                        '& a': {
                            color: 'inherit',
                            textDecoration: 'none',
                            '&:hover': {
                                color: '#00A8CC'
                            }
                        }
                    }}
                >
                    <Link to="/">World Explorer</Link>
                </Typography>
                {user ? (
                    <Button
                        color="inherit"
                        onClick={logout}
                        sx={{
                            fontWeight: 600,
                            '&:hover': {
                                color: '#00A8CC',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        Logout
                    </Button>
                ) : (
                    <Button
                        color="inherit"
                        component={Link}
                        to="/login"
                        sx={{
                            fontWeight: 600,
                            '&:hover': {
                                color: '#00A8CC',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                        }}
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;