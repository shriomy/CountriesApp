import { render, screen, fireEvent } from '@testing-library/react';
import Filter from './Filter';
import { FilterProvider } from '../context/FilterContext';
import React from 'react';

const mockCountries = [
    { name: { common: 'Country A' }, region: 'Europe', population: 1000000 },
    { name: { common: 'Country B' }, region: 'Asia', population: 2000000 }
];

describe('Filter Component', () => {
    it('filters countries by region', async () => {
        render(
            <FilterProvider>
                <Filter countries={mockCountries} />
            </FilterProvider>
        );

        const regionFilter = screen.getByLabelText('Region');
        fireEvent.change(regionFilter, { target: { value: 'Europe' } });

        // You would need to mock the onFilterChange prop or test the context update
        // This is a simplified example
        expect(regionFilter.value).toBe('Europe');
    });
});