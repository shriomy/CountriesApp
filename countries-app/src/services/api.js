import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/all`);
        return response.data;
    } catch (error) {
        console.error('Error fetching all countries:', error);
        return [];
    }
};

export const getCountryByName = async (name) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/name/${name}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching country by name:', error);
        return [];
    }
};

export const getCountriesByRegion = async (region) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/region/${region}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries by region:', error);
        return [];
    }
};

export const getCountryByCode = async (code) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/alpha/${code}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching country by code:', error);
        return null;
    }
};