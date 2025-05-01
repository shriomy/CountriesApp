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
        <Box sx={{ minWidth: 120, marginBottom: 4 }}>
            <FormControl fullWidth>
                <InputLabel id="region-filter-label">Filter by Region</InputLabel>
                <Select
                    labelId="region-filter-label"
                    value={selectedRegion}
                    label="Filter by Region"
                    onChange={handleChange}
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