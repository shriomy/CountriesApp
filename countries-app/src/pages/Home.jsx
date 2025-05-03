import React, { useState, useEffect, useContext  } from 'react';
import { Grid, Container, Box, Typography, CircularProgress, Button } from '@mui/material';
import CountryCard from '../components/CountryCard';
import Search from '../components/Search';
import Filter from '../components/Filter';
import { getAllCountries } from '../services/api';
import { FilterContext } from '../context/FilterContext';

const Home = () => {
    const { filters, setFilters } = useContext(FilterContext);
    const [allCountries, setAllCountries] = useState([]);
    const [displayedCountries, setDisplayedCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getAllCountries();
                setAllCountries(data);
                setDisplayedCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
                setError('Failed to load countries. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const applyFilters = (countries, filterState) => {
        const filtered = countries.filter(country => {
            return (
                (!filterState.region || country.region === filterState.region) &&
                (!filterState.language || (country.languages &&
                    Object.values(country.languages).includes(filterState.language))) &&
                (!filterState.currency || (country.currencies &&
                    Object.values(country.currencies).some(c => c.name === filterState.currency))) &&
                (!filterState.populationMin || country.population >= Number(filterState.populationMin)) &&
                (!filterState.populationMax || country.population <= Number(filterState.populationMax)) &&
                (filterState.independent === null || country.independent === filterState.independent) &&
                (filterState.unMember === null || country.unMember === filterState.unMember) &&
                (!filterState.searchTerm || country.name.common.toLowerCase()
                    .includes(filterState.searchTerm.toLowerCase()))
            );
        });
        setDisplayedCountries(filtered);
    };

    const handleSearchChange = (searchTerm) => {
        const newFilters = { ...filters, searchTerm };
        setFilters(newFilters);
        applyFilters(allCountries, newFilters);
    };

    const handleFilterChange = (filtered) => {
        setDisplayedCountries(filtered);
    };

    const handleClearFilters = () => {
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
        applyFilters(allCountries, newFilters);
    };


    const handleRetry = () => {
        setError(null);
        setLoading(true);
        const fetchCountries = async () => {
            try {
                const data = await getAllCountries();
                setAllCountries(data);
                setDisplayedCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
                setError('Failed to load countries. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    };

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress sx={{ color: '#2B3945' }} />
        </Box>
    );

    if (error) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
                textAlign: 'center',
                gap: 2
            }}>
                <Typography variant="h6" color="error">{error}</Typography>
                <Button
                    variant="contained"
                    onClick={handleRetry}
                    sx={{
                        backgroundColor: '#2B3945',
                        '&:hover': {
                            backgroundColor: '#00A8CC'
                        }
                    }}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    const HeroSection = () => {
        return (
            <Box sx={{
                textAlign: 'center',
                mb: 6,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 3,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            }}>
                {/* Background Pattern */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0.1,
                    backgroundImage: 'url("https://images.unsplash.com/photo-1589519160732-57fc498494f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 1
                }} />

                {/* Gradient Overlay */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
                    zIndex: 2
                }} />

                {/* Content */}
                <Box sx={{
                    position: 'relative',
                    color: 'white',
                    p: 6,
                    zIndex: 3
                }}>
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
                        Explore the World
                    </Typography>
                    <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
                        Discover detailed information about every country and territory on our planet
                    </Typography>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: 'white',
                                color: '#1e3c72',
                                fontWeight: 600,
                                px: 4,
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.9)'
                                }
                            }}
                        >
                            Start Exploring
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            {/* Hero Section */}
            <HeroSection />

            {/* Search and Filter Section */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 3,
                mb: 6,
                alignItems: 'center'
            }}>
                {/* You can keep the standalone Search component if you want */}
                <Search onSearch={handleSearchChange} value={filters.searchTerm} />
                <Filter
                    countries={allCountries}
                    onFilterChange={handleFilterChange}
                    onClear={handleClearFilters}
                    searchTerm={filters.searchTerm}
                    onSearchChange={handleSearchChange}
                />
            </Box>

            {/* Results Count */}
            <Typography variant="subtitle1" sx={{ mb: 3, color: '#2B3945' }}>
                Showing {displayedCountries.length} of {allCountries.length} countries
            </Typography>

            {/* Countries Grid */}
            <Grid
                container
                spacing={{ xs: 2, sm: 3, md: 4 }}
                sx={{
                    justifyContent: displayedCountries.length > 0 ? 'center' : 'center',
                    alignItems: 'stretch'
                }}
            >
                {displayedCountries.length > 0 ? (
                    displayedCountries.map((country) => (
                        <Grid
                            item
                            key={country.cca3}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                maxWidth: { xs: '100%', sm: '345px' }
                            }}
                        >
                            <Box sx={{
                                width: '100%',
                                maxWidth: '345px',
                                height: '100%'
                            }}>
                                <CountryCard country={country} />
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Box sx={{
                        width: '100%',
                        textAlign: 'center',
                        mt: 8,
                        p: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.02)',
                        borderRadius: 2
                    }}>
                        <Typography variant="h5" sx={{ mb: 2, color: '#2B3945' }}>
                            No countries found
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
                            Try adjusting your search or filters
                        </Typography>
                        <Button
                            variant="outlined"
                            onClick={handleClearFilters}
                            sx={{
                                color: '#2B3945',
                                borderColor: '#2B3945',
                                '&:hover': {
                                    backgroundColor: '#f0f0f0',
                                    borderColor: '#2B3945'
                                }
                            }}
                        >
                            Clear All Filters
                        </Button>
                    </Box>
                )}
            </Grid>
        </Container>
    );
};


export default Home;