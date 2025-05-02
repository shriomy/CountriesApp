import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {Box, Typography, Paper, Button, Stack, Chip} from '@mui/material';
import { getCountryByCode } from '../services/api';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CountryDetails = () => {
    const { countryCode } = useParams();
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const data = await getCountryByCode(countryCode);
                setCountry(data?.[0] || null);
                setError(data ? null : 'Country not found');
            } catch (err) {
                setError('Failed to fetch country details');
            } finally {
                setLoading(false);
            }
        };

        fetchCountry();
    }, [countryCode]);

    // Helper function to safely render object values
    const renderObjectValues = (obj) => {
        if (!obj) return 'N/A';
        return Object.values(obj).map(val => val?.name || val).join(', ');
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;
    if (!country) return <Typography>Country not found</Typography>;

    return (
        <Paper sx={{
            padding: 6,
            maxWidth: 1200,
            margin: 'auto',
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
            <Button
                component={Link}
                to="/"
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{
                    mb: 6,
                    color: '#2B3945',
                    borderColor: '#2B3945',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                        borderColor: '#2B3945'
                    }
                }}
            >
                Back
            </Button>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 8 }}>
                <Box sx={{ flex: 1 }}>
                    <img
                        src={country.flags?.png || ''}
                        alt={`Flag of ${country.name?.common || 'country'}`}
                        style={{
                            width: '100%',
                            maxWidth: 600,
                            borderRadius: 8,
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, mb: 4 }}>
                        {country.name?.common || 'Unknown Country'}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 6, mb: 4 }}>
                        <Box>
                            <Typography sx={{ mb: 2 }}>
                                <Box component="span" sx={{ fontWeight: 600 }}>Native Name:</Box> {country.name?.nativeName ?
                                Object.values(country.name.nativeName)[0]?.common :
                                'N/A'}
                            </Typography>
                            <Typography sx={{ mb: 2 }}>
                                <Box component="span" sx={{ fontWeight: 600 }}>Population:</Box> {country.population?.toLocaleString() || 'N/A'}
                            </Typography>
                            <Typography sx={{ mb: 2 }}>
                                <Box component="span" sx={{ fontWeight: 600 }}>Region:</Box> {country.region || 'N/A'}
                            </Typography>
                            <Typography sx={{ mb: 2 }}>
                                <Box component="span" sx={{ fontWeight: 600 }}>Sub Region:</Box> {country.subregion || 'N/A'}
                            </Typography>
                            <Typography>
                                <Box component="span" sx={{ fontWeight: 600 }}>Capital:</Box> {country.capital?.[0] || 'N/A'}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography sx={{ mb: 2 }}>
                                <Box component="span" sx={{ fontWeight: 600 }}>Top Level Domain:</Box> {country.tld?.[0] || 'N/A'}
                            </Typography>
                            <Typography sx={{ mb: 2 }}>
                                <Box component="span" sx={{ fontWeight: 600 }}>Currencies:</Box> {country.currencies ?
                                Object.values(country.currencies).map(c => c.name).join(', ') :
                                'N/A'}
                            </Typography>
                            <Typography>
                                <Box component="span" sx={{ fontWeight: 600 }}>Languages:</Box> {country.languages ?
                                Object.values(country.languages).join(', ') :
                                'N/A'}
                            </Typography>
                        </Box>
                    </Box>

                    {country.borders && country.borders.length > 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                                Border Countries:
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                {country.borders.map((border) => (
                                    <Chip
                                        key={border}
                                        component={Link}
                                        to={`/country/${border}`}
                                        label={border}
                                        clickable
                                        sx={{
                                            backgroundColor: '#2B3945',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#00A8CC'
                                            }
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Box>
            </Box>
        </Paper>
    );
};

export default CountryDetails;