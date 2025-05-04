import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Optional: Configure test timeout
jest.setTimeout(10000);

// Optional: Mock window.matchMedia
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {},
        addEventListener: function() {},
        removeEventListener: function() {},
        dispatchEvent: function() { return false; }
    };
};
class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}
window.ResizeObserver = ResizeObserver;