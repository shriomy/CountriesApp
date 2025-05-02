import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
    return (
        <Card sx={{
            maxWidth: 320,
            margin: 2,
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
            }
        }}>
            <CardMedia
                component="img"
                height="180"
                image={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                sx={{ borderBottom: '1px solid #eee' }}
            />
            <CardContent sx={{ padding: 3 }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                        fontWeight: 800,
                        color: '#111517',
                        mb: 2
                    }}
                >
                    {country.name.common}
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <Box component="span" sx={{ fontWeight: 600, color: '#111517' }}>Population:</Box> {country.population.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <Box component="span" sx={{ fontWeight: 600, color: '#111517' }}>Region:</Box> {country.region}
                    </Typography>
                    <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 600, color: '#111517' }}>Capital:</Box> {country.capital?.[0] || 'N/A'}
                    </Typography>
                </Box>
                <Button
                    component={Link}
                    to={`/country/${country.cca3}`}
                    variant="contained"
                    sx={{
                        mt: 2,
                        backgroundColor: '#2B3945',
                        '&:hover': {
                            backgroundColor: '#00A8CC'
                        }
                    }}
                >
                    Learn More
                </Button>
            </CardContent>
        </Card>
    );
};

export default CountryCard;