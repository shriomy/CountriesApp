import React from 'react';
import {Box, Typography} from '@mui/material';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <Box sx={{
            minHeight: '100vh',
            backgroundColor: '#FAFAFA'
        }}>
            <Header />
            <Box component="main" sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
                {children}
            </Box>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: '#2B3945',
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <Typography variant="body2">
                    © {new Date().getFullYear()} World Explorer - Country Information App
                </Typography>
            </Box>
        </Box>
    );
};

export default Layout;