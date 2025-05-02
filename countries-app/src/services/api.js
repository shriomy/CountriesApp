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

// Add to your api.js
export const getCountriesByLanguage = async (language) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/lang/${language}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries by language:', error);
        return [];
    }
};

export const getCountriesByCurrency = async (currency) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/currency/${currency}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries by currency:', error);
        return [];
    }
};

export const getCountriesBySubregion = async (subregion) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/subregion/${subregion}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching countries by subregion:', error);
        return [];
    }
};