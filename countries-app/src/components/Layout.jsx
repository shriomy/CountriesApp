import React from 'react';
import {Box, Container, Typography} from '@mui/material';
import Header from './Header';
import { styled } from '@mui/material/styles';

const FooterBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4, 0),
    marginTop: 'auto',
    background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
    color: 'white',
    textAlign: 'center'
}));

const Layout = ({ children }) => {
    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: '#F5F7FA',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Header />
            <Box component="main" sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 }, flexGrow: 1  }}>
                {children}
            </Box>
            <FooterBox component="footer">
                <Container>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        World Explorer
                    </Typography>
                    <Typography variant="body2">
                        © {new Date().getFullYear()} World Explorer - Discover Our Amazing Planet
                    </Typography>
                </Container>
            </FooterBox>
        </Box>
    );
};

export default Layout;