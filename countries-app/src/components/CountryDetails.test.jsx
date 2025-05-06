import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import CountryDetails from './CountryDetails';
import { getCountryByCode } from '../services/api';

// Mock the API module
jest.mock('../services/api');

// Create a theme for testing
const theme = createTheme();

// Mock data for the country
const mockCountry = {
    name: {
        common: 'Germany',
        official: 'Federal Republic of Germany',
        nativeName: {
            deu: {
                common: 'Deutschland'
            }
        }
    },
    cca3: 'DEU',
    capital: ['Berlin'],
    region: 'Europe',
    subregion: 'Western Europe',
    population: 83240000,
    flags: {
        png: 'https://flagcdn.com/w320/de.png'
    },
    languages: {
        deu: 'German'
    },
    currencies: {
        EUR: {
            name: 'Euro',
            symbol: '€'
        }
    },
    timezones: ['UTC+01:00'],
    idd: {
        root: '+4',
        suffixes: ['9']
    },
    car: {
        side: 'right'
    },
    latlng: [51.0, 9.0],
    borders: ['AUT', 'BEL', 'CZE']
};

// Mock neighbor country data
const mockNeighbors = [
    {
        name: {
            common: 'Austria'
        },
        cca3: 'AUT'
    },
    {
        name: {
            common: 'Belgium'
        },
        cca3: 'BEL'
    },
    {
        name: {
            common: 'Czech Republic'
        },
        cca3: 'CZE'
    }
];

describe('CountryDetails Component', () => {
    // Helper function to render the component with necessary providers
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
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('shows loading state initially', () => {
        // Setup the API mock for a loading state
        getCountryByCode.mockImplementation(() => new Promise(() => {}));

        renderWithProviders(<CountryDetails />);

        // Check for Skeleton components - in this component they use the variant="rectangular" type
        const skeletons = screen.getAllByTestId(/^mui-skeleton$/);
        expect(skeletons.length).toBeGreaterThan(0);
    });

    it('displays country information correctly when data is loaded', async () => {
        // Setup API mocks for successful responses
        getCountryByCode.mockImplementation((code) => {
            if (code === 'DEU') {
                return Promise.resolve([mockCountry]);
            } else if (mockCountry.borders.includes(code)) {
                return Promise.resolve([mockNeighbors.find(n => n.cca3 === code)]);
            }
            return Promise.resolve([]);
        });

        renderWithProviders(<CountryDetails />);

        // Wait for data to load and component to render with a unique identifier
        await waitFor(() => {
            expect(screen.getByText('Federal Republic of Germany')).toBeInTheDocument();
        });

        // Check basic country information is displayed
        const headingElement = screen.getByRole('heading', { name: 'Germany' });
        expect(headingElement).toBeInTheDocument();
        expect(screen.getByText('Deutschland')).toBeInTheDocument();
        expect(screen.getByText('83,240,000')).toBeInTheDocument();
        expect(screen.getByText('Berlin')).toBeInTheDocument();
        expect(screen.getByText('Europe')).toBeInTheDocument();
        expect(screen.getByText('Western Europe')).toBeInTheDocument();
        expect(screen.getByText('German')).toBeInTheDocument();
        expect(screen.getByText('Euro (€)')).toBeInTheDocument();
        expect(screen.getByText('UTC+01:00')).toBeInTheDocument();
        expect(screen.getByText('+49')).toBeInTheDocument();
        expect(screen.getByText('Right')).toBeInTheDocument();

        // Check for neighboring countries
        expect(screen.getByText('Austria')).toBeInTheDocument();
        expect(screen.getByText('Belgium')).toBeInTheDocument();
        expect(screen.getByText('Czech Republic')).toBeInTheDocument();

        // Check for the back button
        expect(screen.getByText('Back to Countries')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /back to countries/i })).toHaveAttribute('href', '/');
    });

    it('handles missing country data gracefully', async () => {
        // Setup API mock to return empty data
        getCountryByCode.mockResolvedValue([]);

        renderWithProviders(<CountryDetails />);

        // Wait for component to render with error state
        await waitFor(() => {
            expect(screen.getByText('Country not found')).toBeInTheDocument();
        });

        // Check for the back button in error state
        expect(screen.getByText('Back to Home')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
    });

    it('handles API error gracefully', async () => {
        // Setup API mock to throw an error
        getCountryByCode.mockRejectedValue(new Error('Failed to fetch'));

        renderWithProviders(<CountryDetails />);

        // Wait for component to render with error state
        await waitFor(() => {
            expect(screen.getByText('Failed to fetch country details')).toBeInTheDocument();
        });

        // Check for the back button in error state
        expect(screen.getByText('Back to Home')).toBeInTheDocument();
    });

    it('handles missing properties gracefully', async () => {
        // Setup API mock with incomplete country data
        const incompleteCountry = {
            name: {
                common: 'Incomplete Country'
            },
            flags: {},
            cca3: 'INC'
        };

        getCountryByCode.mockResolvedValue([incompleteCountry]);

        renderWithProviders(<CountryDetails />, { route: '/country/INC' });

        // Wait for component to render with incomplete data
        await waitFor(() => {
            expect(screen.getByText('Incomplete Country')).toBeInTheDocument();
        });

        // Check that N/A is displayed for missing properties
        const allNAItems = screen.getAllByText('N/A');
        expect(allNAItems.length).toBeGreaterThan(0);
    });

    it('renders the map when coordinates are available', async () => {
        getCountryByCode.mockResolvedValue([mockCountry]);

        renderWithProviders(<CountryDetails />);

        // Wait for data to load with a unique identifier
        await waitFor(() => {
            expect(screen.getByText('Federal Republic of Germany')).toBeInTheDocument();
        });

        // Check for map section
        expect(screen.getByText('Location')).toBeInTheDocument();

        // Check for iframe with map
        const mapIframe = screen.getByTitle('Map of Germany');
        expect(mapIframe).toBeInTheDocument();
        expect(mapIframe.tagName).toBe('IFRAME');
    });

    it('displays coat of arms when available', async () => {
        // Add coat of arms to mock data
        const countryWithCoatOfArms = {
            ...mockCountry,
            coatOfArms: {
                png: 'https://mainfacts.com/media/images/coats_of_arms/de.png'
            }
        };

        getCountryByCode.mockResolvedValue([countryWithCoatOfArms]);

        renderWithProviders(<CountryDetails />);

        // Wait for data to load using a more specific selector to avoid ambiguity
        await waitFor(() => {
            expect(screen.getByText('Federal Republic of Germany')).toBeInTheDocument();
        });

        // Check for coat of arms image
        expect(screen.getByAltText('Coat of arms of Germany')).toBeInTheDocument();
    });
});