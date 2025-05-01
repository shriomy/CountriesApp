import React, { useState, useEffect } from 'react';
import {Grid, Container, Box, Typography} from '@mui/material';
import CountryCard from '../components/CountryCard';
import Search from '../components/Search';
import Filter from '../components/Filter';
import { getAllCountries, getCountriesByRegion, getCountryByName } from '../services/api';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getAllCountries();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const handleSearch = async (searchTerm) => {
        if (!searchTerm.trim()) {
            try {
                const data = await getAllCountries();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching all countries:', error);
                setCountries([]);
            }
            return;
        }

        try {
            const data = await getCountryByName(searchTerm);
            setCountries(data);
        } catch (error) {
            console.error('Error searching countries:', error);
            setCountries([]);
        }
    };

    const handleFilter = async (region) => {
        if (!region) {
            try {
                const data = await getAllCountries();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching all countries:', error);
                setCountries([]);
            }
            return;
        }

        try {
            const data = await getCountriesByRegion(region);
            setCountries(data);
        } catch (error) {
            console.error('Error filtering countries:', error);
            setCountries([]);
        }
    };

    if (loading) return <Box>Loading...</Box>;

    return (
        <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', my: 4 }}>
                <Search onSearch={handleSearch} />
                <Filter onFilter={handleFilter} />
            </Box>

            <Grid container spacing={4}>
                {countries.length > 0 ? (
                    countries.map((country) => (
                        <Grid item key={country.cca3} xs={12} sm={6} md={4} lg={3}>
                            <CountryCard country={country} />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
                        No countries found
                    </Typography>
                )}
            </Grid>
        </Container>
    );
};

export default Home;