import React, {useContext} from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                        Countries App
                    </Link>
                </Typography>
                {user ? (
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                ) : (
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;