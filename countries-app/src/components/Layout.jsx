import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Header />
            <Box component="main" sx={{ py: 3 }}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;