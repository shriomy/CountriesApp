// HomePageIntegration.test.jsx
import React from 'react';
// HomePageIntegration.test.jsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from '../pages/Home';
import CountryPage from '../pages/CountryPage';
import { getAllCountries, getCountryByCode } from '../services/api';
import { FilterProvider } from '../context/FilterContext';

// Mock the API module
jest.mock('../services/api');

const theme = createTheme();

const mockCountries = [
    {
        name: { common: 'Germany', official: 'Federal Republic of Germany' },
        flags: { png: 'https://flagcdn.com/w320/de.png' },
        population: 83240000,
        region: 'Europe',
        capital: ['Berlin'],
        cca3: 'DEU'
    },
    {
        name: { common: 'France', official: 'French Republic' },
        flags: { png: 'https://flagcdn.com/w320/fr.png' },
        population: 67390000,
        region: 'Europe',
        capital: ['Paris'],
        cca3: 'FRA'
    }
];

const mockCountryDetails = {
    name: {
        common: 'Germany',
        official: 'Federal Republic of Germany'
    },
    capital: ['Berlin'],
    population: 83240000
};

describe('Home Page Integration Test', () => {
    const renderWithProviders = (ui, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);

        return render(
            <ThemeProvider theme={theme}>
                <FilterProvider>
                    <MemoryRouter initialEntries={[route]}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/country/:countryCode" element={<CountryPage />} />
                        </Routes>
                    </MemoryRouter>
                </FilterProvider>
            </ThemeProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
        getAllCountries.mockResolvedValue(mockCountries);
        getCountryByCode.mockImplementation((code) => {
            if (code === 'DEU') return Promise.resolve([mockCountryDetails]);
            return Promise.resolve([]);
        });
    });

    it('should display countries on home page', async () => {
        renderWithProviders(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Germany')).toBeInTheDocument();
            expect(screen.getByText('France')).toBeInTheDocument();
        });
    });

    it('should navigate to country details when clicking a country card', async () => {
        renderWithProviders(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Germany')).toBeInTheDocument();
        });

        // Click the first "Learn More" button found
        const learnMoreButtons = screen.getAllByText('Learn More');
        fireEvent.click(learnMoreButtons[0]);

        await waitFor(() => {
            expect(screen.getByText('Federal Republic of Germany')).toBeInTheDocument();
        });
    });

    it('should show filter options when clicking filter button', async () => {
        renderWithProviders(<Home />);

        await waitFor(() => {
            expect(screen.getByText('Germany')).toBeInTheDocument();
        });

        const filterButton = screen.getByText('Filters');
        fireEvent.click(filterButton);

        await waitFor(() => {
            expect(screen.getByText('Apply Filters')).toBeInTheDocument();
        });
    });
});