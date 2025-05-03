import React, { useState, useEffect, useContext  } from 'react';
import {
    Box,
    Button,
    Menu,
    Typography,
    Chip,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Autocomplete,
    Drawer,
    IconButton,
    useMediaQuery,
    Divider,
    Stack
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import SearchIcon from '@mui/icons-material/Search';
import { FilterContext } from '../context/FilterContext';

const Filter = ({
                    countries,
                    onFilterChange,
                    onClear,
                    searchTerm,
                    onSearchChange
                }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { filters, setFilters } = useContext(FilterContext);

    const isMobile = useMediaQuery('(max-width:600px)');

    // Extract filter options
    const regions = [...new Set(countries.map(c => c.region))].filter(Boolean).sort();
    const subregions = [...new Set(countries.map(c => c.subregion))].filter(Boolean).sort();

    const languages = [...new Set(
        countries.flatMap(c =>
            c.languages ? Object.values(c.languages) : []
        )
    )].filter(Boolean).sort();

    const currencies = [...new Set(
        countries.flatMap(c =>
            c.currencies ? Object.values(c.currencies).map(curr => curr.name) : []
        )
    )].filter(Boolean).sort();

    // Apply filters whenever they change
    useEffect(() => {
        const filteredCountries = countries.filter(country => {
            const matchesSearch = !filters.searchTerm ||
                country.name.common.toLowerCase().includes(filters.searchTerm.toLowerCase());
            return (
                matchesSearch &&
                (!filters.region || country.region === filters.region) &&
                (!filters.subregion || country.subregion === filters.subregion) &&
                (!filters.language || (country.languages &&
                    Object.values(country.languages).includes(filters.language))) &&
                (!filters.currency || (country.currencies &&
                    Object.values(country.currencies).some(c => c.name === filters.currency))) &&
                (!filters.populationMin || country.population >= Number(filters.populationMin)) &&
                (!filters.populationMax || country.population <= Number(filters.populationMax)) &&
                (filters.independent === null || country.independent === filters.independent) &&
                (filters.unMember === null || country.unMember === filters.unMember)
            );
        });
        onFilterChange(filteredCountries);
    }, [filters, countries, onFilterChange]);

    const handleFilterChange = (name, value) => {
        const newFilters = { ...filters, [name]: value };
        setFilters(newFilters);
    };

    const clearFilter = (name) => {
        const newFilters = { ...filters, [name]: name.startsWith('population') ? '' : null };
        setFilters(newFilters);
    };

    const clearAllFilters = () => {
        const newFilters = {
            region: null,
            language: null,
            currency: null,
            populationMin: '',
            populationMax: '',
            independent: null,
            unMember: null,
            searchTerm: ''
        };
        setFilters(newFilters);
        onClear();
    };

    const getFilterLabel = (key, value) => {
        const labels = {
            region: `Region: ${value}`,
            subregion: `Subregion: ${value}`,
            language: `Language: ${value}`,
            currency: `Currency: ${value}`,
            populationMin: `Min Pop: ${Number(value).toLocaleString()}`,
            populationMax: `Max Pop: ${Number(value).toLocaleString()}`,
            independent: `Independent: ${value ? 'Yes' : 'No'}`,
            unMember: `UN Member: ${value ? 'Yes' : 'No'}`
        };
        return labels[key] || '';
    };

    const renderFilterContent = () => (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Filter Countries
            </Typography>

            {/* Search Field */}
            <TextField
                fullWidth
                label="Search by name"
                variant="outlined"
                value={filters.searchTerm || ''}
                onChange={(e) => onSearchChange(e.target.value)}
                size="small"
                sx={{ mb: 2 }}
                InputProps={{
                    startAdornment: (
                        <SearchIcon color="action" sx={{ mr: 1 }} />
                    ),
                }}
            />

            <Divider sx={{ my: 2 }} />

            {/* Region Filter */}
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Region</InputLabel>
                <Select
                    value={filters.region || ''}
                    label="Region"
                    onChange={(e) => handleFilterChange('region', e.target.value || null)}
                >
                    <MenuItem value="">All Regions</MenuItem>
                    {regions.map(region => (
                        <MenuItem key={region} value={region}>{region}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Subregion Filter */}
            {filters.region && (
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                    <InputLabel>Subregion</InputLabel>
                    <Select
                        value={filters.subregion || ''}
                        label="Subregion"
                        onChange={(e) => handleFilterChange('subregion', e.target.value || null)}
                    >
                        <MenuItem value="">All Subregions</MenuItem>
                        {subregions
                            .filter(subregion =>
                                countries.some(c => c.region === filters.region && c.subregion === subregion)
                            )
                            .map(subregion => (
                                <MenuItem key={subregion} value={subregion}>{subregion}</MenuItem>
                            ))}
                    </Select>
                </FormControl>
            )}

            {/* Language Filter */}
            <Autocomplete
                options={languages}
                value={filters.language}
                onChange={(_, newValue) => handleFilterChange('language', newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Language"
                        size="small"
                        fullWidth
                        sx={{ mb: 2 }}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                )}
                freeSolo
                disableClearable
            />

            {/* Currency Filter */}
            <Autocomplete
                options={currencies}
                value={filters.currency}
                onChange={(_, newValue) => handleFilterChange('currency', newValue)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Currency"
                        size="small"
                        fullWidth
                        sx={{ mb: 2 }}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                )}
                freeSolo
                disableClearable
            />

            {/* Population Range */}
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Population
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <TextField
                    label="Min"
                    type="number"
                    size="small"
                    value={filters.populationMin}
                    onChange={(e) => handleFilterChange('populationMin', e.target.value)}
                    sx={{ flex: 1 }}
                    InputProps={{
                        inputProps: { min: 0 },
                        onFocus: (e) => e.stopPropagation()
                    }}
                />
                <TextField
                    label="Max"
                    type="number"
                    size="small"
                    value={filters.populationMax}
                    onChange={(e) => handleFilterChange('populationMax', e.target.value)}
                    sx={{ flex: 1 }}
                    InputProps={{
                        inputProps: { min: 0 },
                        onFocus: (e) => e.stopPropagation()
                    }}
                />
            </Stack>

            {/* Status Filters */}
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Status
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Button
                    variant={filters.independent === true ? "contained" : "outlined"}
                    onClick={() => handleFilterChange('independent', filters.independent === true ? null : true)}
                    size="small"
                >
                    Independent
                </Button>
                <Button
                    variant={filters.unMember === true ? "contained" : "outlined"}
                    onClick={() => handleFilterChange('unMember', filters.unMember === true ? null : true)}
                    size="small"
                >
                    UN Member
                </Button>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Clear All Button */}
            <Button
                fullWidth
                variant="contained"
                onClick={clearAllFilters}
                startIcon={<ClearAllIcon />}
                sx={{
                    mt: 1,
                    backgroundColor: '#ff4444',
                    '&:hover': {
                        backgroundColor: '#cc0000'
                    }
                }}
                onFocus={(e) => e.stopPropagation()}
            >
                Clear All Filters
            </Button>
        </Box>
    );

    return (
        <Box>
            {/* Filter Controls */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2,
                flexWrap: 'wrap'
            }}>
                <Button
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    onClick={(e) => isMobile ? setMobileOpen(!mobileOpen) : setAnchorEl(e.currentTarget)}
                    sx={{
                        borderColor: '#2B3945',
                        color: '#2B3945',
                        '&:hover': {
                            borderColor: '#00A8CC',
                            backgroundColor: 'rgba(0, 168, 204, 0.08)'
                        }
                    }}
                >
                    Filters
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<ClearAllIcon />}
                    onClick={clearAllFilters}
                    sx={{
                        borderColor: '#2B3945',
                        color: '#2B3945',
                        '&:hover': {
                            borderColor: '#00A8CC',
                            backgroundColor: 'rgba(0, 168, 204, 0.08)'
                        }
                    }}
                >
                    Clear All
                </Button>

                {/* Active Filters Chips */}
                <Box sx={{
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap',
                    flex: 1,
                    minWidth: { xs: '100%', sm: 'auto' }
                }}>
                    {Object.entries(filters).map(([key, value]) => {
                        if (
                            !value &&
                            value !== false &&
                            value !== 0 &&
                            value !== ''
                        ) return null;

                        return (
                            <Chip
                                key={key}
                                label={getFilterLabel(key, value)}
                                onDelete={() => clearFilter(key)}
                                deleteIcon={<CloseIcon fontSize="small" />}
                                sx={{
                                    backgroundColor: '#00A8CC',
                                    color: 'white',
                                    '& .MuiChip-deleteIcon': {
                                        color: 'white',
                                        '&:hover': {
                                            color: 'rgba(255, 255, 255, 0.8)'
                                        }
                                    }
                                }}
                            />
                        );
                    })}
                </Box>
            </Box>

            {/* Mobile Filter Drawer */}
            <Drawer
                anchor="bottom"
                open={mobileOpen && isMobile}
                onClose={() => setMobileOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        height: '80vh',
                        p: 3,
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        }
                    }
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}>
                    <Typography variant="h6">Filter Countries</Typography>
                    <IconButton
                        onClick={() => setMobileOpen(false)}
                        sx={{ color: 'text.primary' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                {renderFilterContent()}
            </Drawer>

            {/* Desktop Filter Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && !isMobile}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    sx: {
                        width: 350,
                        maxWidth: '90vw',
                        p: 2,
                        maxHeight: '70vh',
                        overflow: 'auto',
                        '& .MuiAutocomplete-inputRoot': {
                            paddingRight: '9px !important'
                        }
                    }
                }}
            >
                {renderFilterContent()}
            </Menu>
        </Box>
    );
};

export default Filter;