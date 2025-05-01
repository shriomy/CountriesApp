import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import { getCountryByCode } from '../services/api';
import { Link } from 'react-router-dom';

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

    // Replace the existing return statement with this:
    return (
        <Paper sx={{ padding: 4, maxWidth: 800, margin: 'auto' }}>
            <Button component={Link} to="/" variant="outlined" sx={{ mb: 4 }}>
                Back
            </Button>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
                <Box sx={{ flex: 1 }}>
                    <img
                        src={country.flags?.png || ''}
                        alt={`Flag of ${country.name?.common || 'country'}`}
                        style={{ width: '100%', maxWidth: 500, border: '1px solid #ddd' }}
                    />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" gutterBottom>
                        {country.name?.common || 'Unknown Country'}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 3 }}>
                        <Box>
                            <Typography><strong>Native Name:</strong> {country.name?.nativeName ? Object.values(country.name.nativeName)[0]?.common : 'N/A'}</Typography>
                            <Typography><strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}</Typography>
                            <Typography><strong>Region:</strong> {country.region || 'N/A'}</Typography>
                            <Typography><strong>Sub Region:</strong> {country.subregion || 'N/A'}</Typography>
                            <Typography><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</Typography>
                        </Box>

                        <Box>
                            <Typography><strong>Top Level Domain:</strong> {country.tld?.[0] || 'N/A'}</Typography>
                            <Typography><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</Typography>
                            <Typography><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</Typography>
                        </Box>
                    </Box>

                    {country.borders && country.borders.length > 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom>Border Countries:</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {country.borders.map((border) => (
                                    <Button
                                        key={border}
                                        component={Link}
                                        to={`/country/${border}`}
                                        variant="outlined"
                                        size="small"
                                    >
                                        {border}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Paper>
    );
};

export default CountryDetails;