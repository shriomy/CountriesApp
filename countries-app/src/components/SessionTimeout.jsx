// src/components/SessionTimeout.jsx
import { useEffect, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';

const SessionTimeout = () => {
    const { setFilters } = useContext(FilterContext);
    const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutes

    useEffect(() => {
        let timeout;
        const resetTimer = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                alert('Your session will expire soon!');
                setFilters({
                    region: null,
                    language: null,
                    currency: null,
                    populationMin: '',
                    populationMax: '',
                    independent: null,
                    unMember: null,
                    searchTerm: ''
                });
            }, INACTIVITY_LIMIT);
        };

        // Reset timer on user activity
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keypress', resetTimer);
        resetTimer(); // Initialize timer

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keypress', resetTimer);
        };
    }, [setFilters]);

    return null; // This component doesn't render anything
};

export default SessionTimeout;