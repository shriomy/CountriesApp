import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const Filter = ({ onFilter }) => {
    const [selectedRegion, setSelectedRegion] = useState('');

    const handleChange = (e) => {
        setSelectedRegion(e.target.value);
        onFilter(e.target.value);
    };

    return (
        <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
                <InputLabel id="region-filter-label" sx={{ color: '#2B3945' }}>Filter by Region</InputLabel>
                <Select
                    labelId="region-filter-label"
                    value={selectedRegion}
                    label="Filter by Region"
                    onChange={handleChange}
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2B3945',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#00A8CC',
                        },
                    }}
                >
                    <MenuItem value="">All Regions</MenuItem>
                    {regions.map((region) => (
                        <MenuItem key={region} value={region}>
                            {region}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Filter;