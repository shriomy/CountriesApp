import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Button, Stack, Chip, Divider, Skeleton, Grid} from '@mui/material';
import { getCountryByCode } from '../services/api';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Public as PublicIcon,
    Language as LanguageIcon,
    MonetizationOn as MoneyIcon,
    People as PeopleIcon,
    LocationCity as CapitalIcon,
    Map as MapIcon,
    Terrain as TerrainIcon,
    AccessTime as TimeIcon,
    Phone as PhoneIcon,
    DriveEta as CarIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Custom styled component for detail rows (icon + text)
const DetailItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
}));

const CountryDetails = () => {
    // Custom styled component for detail rows (icon + text)
    const { countryCode } = useParams();
    // React state hooks
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [neighbors, setNeighbors] = useState([]);
    const [neighborsLoading, setNeighborsLoading] = useState(false);

    // Fetch country data on component mount OR when countryCode changes
    useEffect(() => {
        const fetchCountry = async () => {
            try {
                setLoading(true);
                // Fetch selected country details
                const data = await getCountryByCode(countryCode);
                const countryData = data?.[0] || null;
                setCountry(countryData);
                setError(data ? null : 'Country not found');

                // If country has neighbors, fetch them too
                if (countryData?.borders?.length > 0) {
                    setNeighborsLoading(true);
                    const neighborPromises = countryData.borders.map(code =>
                        getCountryByCode(code)
                    );
                    const neighborData = await Promise.all(neighborPromises);
                    // Filter out any invalid (undefined/null) results
                    setNeighbors(neighborData.map(arr => arr[0]).filter(Boolean));
                }
            } catch (err) {
                console.error('Error fetching country:', err);
                setError('Failed to fetch country details');
            } finally {
                setLoading(false);
                setNeighborsLoading(false);
            }
        };

        fetchCountry();
    }, [countryCode]);

    // Utility: Render object values
    const renderObjectValues = (obj) => {
        if (!obj) return 'N/A';
        return Object.values(obj).map(val => val?.name || val).join(', ');
    };

    // Utility: Format large numbers with commas
    const formatNumber = (num) => {
        return num ? num.toLocaleString() : 'N/A';
    };

    // If loading, show skeleton loaders
    if (loading) {
        return (
            <Box sx={{ p: 4 }} data-testid="loading-container">
                <Skeleton variant="rectangular"  width={200} height={40} sx={{ mb: 3 }} data-testid="skeleton-loader"/>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="rectangular" height={400} data-testid="skeleton-loader"/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Skeleton variant="text" height={60} width="80%" data-testid="skeleton-loader"/>
                        <Skeleton variant="text" height={40} width="60%" data-testid="skeleton-loader"/>
                        <Skeleton variant="text" height={40} width="70%" data-testid="skeleton-loader"/>
                        <Skeleton variant="text" height={40} width="50%" data-testid="skeleton-loader"/>
                    </Grid>
                </Grid>
            </Box>
        );
    }

    // If there’s an error, show error message and back button
    if (error) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                textAlign: 'center',
                p: 4
            }}>
                <Typography variant="h5" color="error" gutterBottom>
                    {error}
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mt: 2 }}
                >
                    Back to Home
                </Button>
            </Box>
        );
    }

    // If there’s an error, show error message and back button
    if (!country) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                textAlign: 'center',
                p: 4
            }}>
                <Typography variant="h5" gutterBottom>
                    Country not found
                </Typography>
                <Button
                    variant="contained"
                    component={Link}
                    to="/"
                    startIcon={<ArrowBackIcon />}
                    sx={{ mt: 2 }}
                >
                    Back to Home
                </Button>
            </Box>
        );
    }

    return (
        <Paper sx={{
            padding: { xs: 3, md: 6 },
            maxWidth: 1400,
            margin: 'auto',
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            mb: 4
        }}>
            <Button
                component={Link}
                to="/"
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{
                    mb: 4,
                    color: '#2B3945',
                    borderColor: '#2B3945',
                    borderRadius: 8,
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        backgroundColor: '#2B3945',
                        borderColor: '#2B3945',
                        color: 'white',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)'
                    }
                }}
            >
                Back to Countries
            </Button>

            <Grid container spacing={6}>
                {/* Flag Image */}
                <Grid item xs={12} md={6}>
                    <Box sx={{
                        position: 'relative',
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
                        height: '100%',
                        minHeight: 400,
                        '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            boxShadow: 'inset 0 -100px 100px -100px rgba(0,0,0,0.3)',
                            pointerEvents: 'none'
                        }
                    }}>
                        <img
                            src={country.flags?.png || ''}
                            alt={`Flag of ${country.name?.common || 'country'}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                backgroundColor: '#f5f5f5'
                            }}
                        />
                        {country.coatOfArms?.png && (
                            <Box sx={{
                                position: 'absolute',
                                bottom: 16,
                                right: 16,
                                width: 100,
                                height: 100,
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                p: 1,
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.1)'
                                }
                            }}>
                                <img
                                    src={country.coatOfArms.png}
                                    alt={`Coat of arms of ${country.name?.common || 'country'}`}
                                    style={{ maxWidth: '80%', maxHeight: '80%' }}
                                />
                            </Box>
                        )}
                    </Box>
                </Grid>

                {/* Country Details */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" gutterBottom sx={{
                        fontWeight: 800,
                        mb: 4,
                        color: '#2B3945'
                    }}>
                        {country.name?.common || 'Unknown Country'}
                        {country.name?.official && (
                            <Typography variant="subtitle1" sx={{
                                fontStyle: 'italic',
                                fontWeight: 400,
                                color: 'text.secondary'
                            }}>
                                {country.name.official}
                            </Typography>
                        )}
                    </Typography>

                    {/* Basic Information */}
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4,
                        mb: 4
                    }}>
                        <Box sx={{ flex: 1, minWidth: 250 }}>
                            <DetailItem>
                                <PublicIcon fontSize="small" />
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600 }}>Native Name:</Box>
                                    {country.name?.nativeName ?
                                        Object.values(country.name.nativeName)[0]?.common : 'N/A'}
                                </Typography>
                            </DetailItem>

                            <DetailItem>
                                <PeopleIcon fontSize="small" />
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600 }}>Population:</Box>
                                    {formatNumber(country.population)}
                                </Typography>
                            </DetailItem>

                            <DetailItem>
                                <MapIcon fontSize="small" />
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600 }}>Region:</Box>
                                    {country.region || 'N/A'}
                                </Typography>
                            </DetailItem>

                            <DetailItem>
                                <TerrainIcon fontSize="small" />
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600 }}>Subregion:</Box>
                                    {country.subregion || 'N/A'}
                                </Typography>
                            </DetailItem>

                            <DetailItem>
                                <CapitalIcon fontSize="small" />
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600 }}>Capital:</Box>
                                    {country.capital?.[0] || 'N/A'}
                                </Typography>
                            </DetailItem>
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 250 }}>
                            <DetailItem>
                                <LanguageIcon fontSize="small" />
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600 }}>Languages:</Box>
                                    {country.languages ?
                                        Object.values(country.languages).join(', ') : 'N/A'}
                                </Typography>
                            </DetailItem>

                            <DetailItem>
                                <MoneyIcon fontSize="small" />
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600 }}>Currencies:</Box>
                                    {country.currencies ?
                                        Object.values(country.currencies)
                                            .map(c => `${c.name} (${c.symbol || '—'})`)
                                            .join(', ') : 'N/A'}
                                </Typography>
                            </DetailItem>

                            <DetailItem>
                                <TimeIcon fontSize="small" />
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600 }}>Timezones:</Box>
                                    {country.timezones?.join(', ') || 'N/A'}
                                </Typography>
                            </DetailItem>

                            <DetailItem>
                                <PhoneIcon fontSize="small" />
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600 }}>Calling Code:</Box>
                                    {country.idd?.root ?
                                        `${country.idd.root}${country.idd.suffixes?.[0] || ''}` : 'N/A'}
                                </Typography>
                            </DetailItem>

                            <DetailItem>
                                <CarIcon fontSize="small" />
                                <Typography>
                                    <Box component="span" sx={{ fontWeight: 600 }}>Driving Side:</Box>
                                    {country.car?.side ? country.car.side.charAt(0).toUpperCase() +
                                        country.car.side.slice(1) : 'N/A'}
                                </Typography>
                            </DetailItem>
                        </Box>
                    </Box>

                    {/* Location Map */}
                    {country.latlng && country.latlng.length === 2 && (
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" gutterBottom sx={{
                                fontWeight: 600,
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <MapIcon /> Location
                            </Typography>
                            <Box sx={{
                                height: 300,
                                borderRadius: 2,
                                overflow: 'hidden',
                                position: 'relative',
                                border: '1px solid #e0e0e0'
                            }}>
                                <iframe
                                    title={`Map of ${country.name.common}`}
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight="0"
                                    marginWidth="0"
                                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                                        country.latlng[1] - 2 // West (longitude - 2)
                                    },${
                                        country.latlng[0] - 2 // South (latitude - 2)
                                    },${
                                        country.latlng[1] + 2 // East (longitude + 2)
                                    },${
                                        country.latlng[0] + 2 // North (latitude + 2)
                                    }&layer=mapnik&marker=${country.latlng[0]}%2C${country.latlng[1]}`}
                                ></iframe>
                                <Box sx={{
                                    position: 'absolute',
                                    bottom: 8,
                                    right: 8,
                                    backgroundColor: 'white',
                                    padding: '4px 8px',
                                    borderRadius: 1,
                                    fontSize: '12px'
                                }}>
                                    <a
                                        href={`https://www.openstreetmap.org/?mlat=${country.latlng[0]}&mlon=${country.latlng[1]}#map=6/${country.latlng[0]}/${country.latlng[1]}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#2B3945', textDecoration: 'none' }}
                                    >
                                        View Larger Map
                                    </a>
                                </Box>
                            </Box>
                        </Box>
                    )}

                    {/* Neighboring Countries */}
                    {neighbors.length > 0 && (
                        <Box>
                            <Typography variant="h6" gutterBottom sx={{
                                fontWeight: 600,
                                mb: 2,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                            }}>
                                <PublicIcon /> Border Countries
                            </Typography>
                            {neighborsLoading ? (
                                <Stack direction="row" spacing={1}>
                                    {[...Array(3)].map((_, i) => (
                                        <Skeleton key={i} variant="rectangular" width={80} height={32} />
                                    ))}
                                </Stack>
                            ) : (
                                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                                    {neighbors.map((neighbor) => (
                                        <Chip
                                            key={neighbor.cca3}
                                            component={Link}
                                            to={`/country/${neighbor.cca3}`}
                                            label={neighbor.name.common}
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
                            )}
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CountryDetails;