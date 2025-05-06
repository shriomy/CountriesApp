import React from 'react';
import { createContext, useState, useEffect } from 'react';

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filters, setFilters] = useState(() => {
        // Initialize from localStorage if available
        const savedFilters = sessionStorage.getItem('countryFilters');
        return savedFilters
            ? JSON.parse(savedFilters)
            : {
                region: null,
                subregion: null,
                language: null,
                currency: null,
                populationMin: '',
                populationMax: '',
                independent: null,
                unMember: null,
                searchTerm: ''
            };
    });

    useEffect(() => {
        // Save to localStorage whenever filters change
        sessionStorage.setItem('countryFilters', JSON.stringify(filters));
    }, [filters]);

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
};