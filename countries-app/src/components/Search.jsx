import React, { useState } from 'react';
import {TextField, Box, InputAdornment, IconButton, Autocomplete} from '@mui/material';
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

// Search component that includes Autocomplete functionality
// Props: onSearch (callback), value (initial search term), countries (autocomplete options)
const Search = ({ onSearch, value, countries = [] }) => {
    // Added default value for countries
    // Local state to track current search term
    const [searchTerm, setSearchTerm] = useState(value || '');

    // Handler when an autocomplete option is selected
    const handleChange = (event, newValue) => {
        const selectedValue = newValue ? newValue.name.common : '';
        setSearchTerm(selectedValue);
        onSearch(selectedValue);
    };


    const handleClear = () => {
        setSearchTerm('');
        onSearch('');
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Autocomplete
                freeSolo
                options={countries || []}
                getOptionLabel={(option) => option.name.common}
                value={countries?.find(c => c.name.common === searchTerm) || null}
                onChange={handleChange}
                onInputChange={(event, newInputValue) => {
                    setSearchTerm(newInputValue);
                    onSearch(newInputValue);
                }}
                renderInput={(params) => (
                    // Render customized search text field inside autocomplete
                    <SearchTextField
                        {...params}
                        label="Search for a country..."
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#2B3945' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <>
                                    {/* Clear button appears only when there's text */}
                                    {searchTerm && (
                                        <InputAdornment position="end">
                                            <IconButton size="small" onClick={handleClear}>
                                                <ClearIcon fontSize="small" />
                                            </IconButton>
                                        </InputAdornment>
                                    )}
                                    {params.InputProps.endAdornment}
                                </>
                            )
                        }}
                    />
                )}
                renderOption={(props, option) => (
                    <Box
                        component="li"
                        {...props}
                        key={option.cca3}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        <img
                            src={option.flags.png}
                            alt=""
                            style={{
                                width: 20,
                                height: 'auto',
                                objectFit: 'cover',
                                borderRadius: 1
                            }}
                        />
                        <span>{option.name.common}</span>
                    </Box>
                )}
                sx={{
                    '& .MuiAutocomplete-popper': {
                        zIndex: 1300 // Ensure dropdown appears above other elements
                    }
                }}
            />
        </Box>
    );
};

export default Search;