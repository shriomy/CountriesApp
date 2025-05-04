import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

/**
 * CountryCard Component
 *
 * Displays a card-like representation of a country with its flag, name,
 * population, region, and capital. Includes a button to navigate to the
 * country's details page.
 *
 * @param {object} country - An object containing country data.
 */

const StyledCard = styled(Card)(({ theme }) => ({
    maxWidth: 320,
    margin: 2,
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 16px 30px rgba(0, 0, 0, 0.12)'
    }
}));

const CardImageWrapper = styled(Box)({
    position: 'relative',
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '30%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
    }
});

const LearnMoreButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    background: 'linear-gradient(45deg, #2B3945 30%, #3f5c78 90%)',
    color: 'white',
    fontWeight: 600,
    borderRadius: 8,
    padding: '10px 0',
    width: '100%',
    '&:hover': {
        background: 'linear-gradient(45deg, #1e2a33 30%, #2B3945 90%)',
        transform: 'scale(1.02)',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
    }
}));

const CountryCard = ({ country }) => {
    return (
        <StyledCard>
            <CardImageWrapper>
                <CardMedia
                    component="img"
                    height="180"
                    image={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                />
            </CardImageWrapper>
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
                        <Box component="span" sx={{ fontWeight: 600, color: '#111517' }}>
                            Population:
                        </Box>{' '}
                        {country.population.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                        <Box component="span" sx={{ fontWeight: 600, color: '#111517' }}>
                            Region:
                        </Box>{' '}
                        {country.region}
                    </Typography>
                    <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 600, color: '#111517' }}>
                            Capital:
                        </Box>{' '}
                        {country.capital?.[0] || 'N/A'}
                    </Typography>
                </Box>
                <LearnMoreButton
                    component={Link}
                    to={`/country/${country.cca3}`}
                    variant="contained"
                >
                    Learn More
                </LearnMoreButton>
            </CardContent>
        </StyledCard>
    );
};

export default CountryCard;