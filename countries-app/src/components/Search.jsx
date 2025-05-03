import React, { useState } from 'react';
import {TextField, Box, InputAdornment, IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';

const SearchTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 12,
        backgroundColor: 'white',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        '&:hover': {
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
        },
        '&.Mui-focused': {
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
        }
    }
}));

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
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
                    endAdornment: searchTerm && (
                        <InputAdornment position="end">
                            <IconButton size="small" onClick={handleClear}>
                                <ClearIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Box>
    );
};

export default Search;