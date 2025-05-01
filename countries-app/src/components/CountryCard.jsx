import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={country.flags.png}
                alt={`Flag of ${country.name.common}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {country.name.common}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Population:</strong> {country.population.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Region:</strong> {country.region}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
                </Typography>
                <Button
                    component={Link}
                    to={`/country/${country.cca3}`}
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Learn More
                </Button>
            </CardContent>
        </Card>
    );
};

export default CountryCard;