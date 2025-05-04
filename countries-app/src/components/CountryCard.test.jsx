import { render, screen } from '@testing-library/react';
import CountryCard from './CountryCard';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';

const mockCountry = {
    name: { common: 'Test Country' },
    flags: { png: 'test-flag.png' },
    population: 1000000,
    region: 'Test Region',
    capital: ['Test Capital'],
    cca3: 'TST'
};

const theme = createTheme();

describe('CountryCard Component', () => {
    const renderWithProviders = (ui, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);

        return render(
            <ThemeProvider theme={theme}>
                <MemoryRouter initialEntries={[route]}>
                    {ui}
                </MemoryRouter>
            </ThemeProvider>
        );
    };

    it('renders country information correctly', () => {
        renderWithProviders(<CountryCard country={mockCountry} />);

        expect(screen.getByText('Test Country')).toBeInTheDocument();
        expect(screen.getByText('1,000,000')).toBeInTheDocument();
        expect(screen.getByText('Test Region')).toBeInTheDocument();
        expect(screen.getByText('Test Capital')).toBeInTheDocument();
    });

    it('displays N/A when capital is missing', () => {
        const noCapitalCountry = {...mockCountry, capital: undefined};
        renderWithProviders(<CountryCard country={noCapitalCountry} />);

        expect(screen.getByText('N/A')).toBeInTheDocument();
    });

    it('contains a link to the country details page', () => {
        renderWithProviders(<CountryCard country={mockCountry} />);
        const link = screen.getByRole('link', { name: /learn more/i });
        expect(link).toHaveAttribute('href', '/country/TST');
    });
});