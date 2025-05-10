import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders World Explorer title in the header', () => {
  render(<App />);
  const headerTitle = screen.getByRole('heading', { name: /World Explorer/i });
  expect(headerTitle).toBeInTheDocument();
});
