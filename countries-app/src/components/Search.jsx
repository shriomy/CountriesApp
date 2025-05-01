import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 500, marginBottom: 4 }}>
            <TextField
                fullWidth
                label="Search for a country..."
                variant="outlined"
                value={searchTerm}
                onChange={handleChange}
            />
        </Box>
    );
};

export default Search;