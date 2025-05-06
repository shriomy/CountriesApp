import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import CountryDetails from './CountryDetails';
import { getCountryByCode } from '../services/api';

// Mock the API module
jest.mock('../services/api');

const theme = createTheme();

const mockCountry = {
    name: {
        common: 'Germany',
        official: 'Federal Republic of Germany',
        nativeName: { deu: { common: 'Deutschland' } }
    },
    cca3: 'DEU',
    capital: ['Berlin'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 83240000,
    flags: { png: 'https://flagcdn.com/w320/de.png' },
    languages: { deu: 'German' },
    currencies: { EUR: { name: 'Euro', symbol: '€' } },
    timezones: ['UTC+01:00'],
    idd: { root: '+4', suffixes: ['9'] },
    car: { side: 'right' },
    latlng: [51.0, 9.0],
    borders: ['AUT', 'BEL', 'CZE']
};

const mockNeighbors = [
    { name: { common: 'Austria' }, cca3: 'AUT' },
    { name: { common: 'Belgium' }, cca3: 'BEL' },
    { name: { common: 'Czech Republic' }, cca3: 'CZE' }
];

describe('CountryDetails Component', () => {
    const renderWithProviders = (ui, { route = '/country/DEU' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(
            <ThemeProvider theme={theme}>
                <MemoryRouter initialEntries={[route]}>
                    <Routes>
                        <Route path="/country/:countryCode" element={ui} />
                    </Routes>
                </MemoryRouter>
            </ThemeProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('shows loading state initially', () => {
        getCountryByCode.mockImplementation(() => new Promise(() => {}));
        renderWithProviders(<CountryDetails />);

        // Verify the main loading container is present
        expect(screen.getByTestId('loading-container')).toBeInTheDocument();

        // Verify multiple skeleton loaders are present
        const skeletons = screen.getAllByTestId('skeleton-loader');
        expect(skeletons.length).toBeGreaterThan(1);
    });

    it('displays country information when loaded', async () => {
        getCountryByCode.mockImplementation((code) => {
            if (code === 'DEU') return Promise.resolve([mockCountry]);
            if (mockCountry.borders.includes(code)) {
                return Promise.resolve([mockNeighbors.find(n => n.cca3 === code)]);
            }
            return Promise.resolve([]);
        });

        renderWithProviders(<CountryDetails />);

        await waitFor(() => {
            expect(screen.getByText('Germany')).toBeInTheDocument();
        });

        expect(screen.getByText('Federal Republic of Germany')).toBeInTheDocument();
        expect(screen.getByText('Deutschland')).toBeInTheDocument();
        expect(screen.getByText('83,240,000')).toBeInTheDocument();
    });

    it('shows error when API fails', async () => {
        getCountryByCode.mockRejectedValue(new Error('API Error'));
        renderWithProviders(<CountryDetails />);

        await waitFor(() => {
            expect(screen.getByText('Failed to fetch country details')).toBeInTheDocument();
        });
    });
});