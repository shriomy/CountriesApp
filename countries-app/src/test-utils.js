import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';

const AllTheProviders = ({ children }) => {
    return (
        <FilterProvider>
            <MemoryRouter>{children}</MemoryRouter>
        </FilterProvider>
    );
};

const customRender = (ui, options) =>
    render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };