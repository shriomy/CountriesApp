import React, { useState } from 'react';
import { TextField, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <TextField
                fullWidth
                label="Search for a country..."
                variant="outlined"
                value={searchTerm}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: '#2B3945' }} />
                        </InputAdornment>
                    ),
                    sx: {
                        backgroundColor: 'white',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2B3945',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#00A8CC',
                        },
                    }
                }}
            />
        </Box>
    );
};

export default Search;