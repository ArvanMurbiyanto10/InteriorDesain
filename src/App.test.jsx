import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('renders Landing Page by default', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    // Check for the Hero title text
    expect(screen.getByText(/Wujudkan Interior/i)).toBeDefined();
    expect(screen.getByText(/Impian Anda/i)).toBeDefined();
  });
});
