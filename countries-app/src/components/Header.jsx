import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container  } from '@mui/material';
import { Link } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import { styled } from '@mui/material/styles';

const GradientAppBar = styled(AppBar)(({ theme }) => ({
    background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
}));

const LogoTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 800,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    '& a': {
        color: 'inherit',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        transition: 'color 0.3s ease',
        '&:hover': {
            color: '#8ecae6'
        }
    }
}));

const Header = () => {
    return (
        <GradientAppBar position="static">
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    <LogoTypography variant="h5" component="div">
                        <Link to="/">
                            <PublicIcon sx={{ fontSize: 32 }} />
                            World Explorer
                        </Link>
                    </LogoTypography>
                </Toolbar>
            </Container>
        </GradientAppBar>
    );
};


export default Header;