import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {

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
            </Toolbar>
        </AppBar>
    );
};

export default Header;