import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import App from './App';

expect.extend(toHaveNoViolations);

describe('App Component', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<App />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render the Form by default', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /^register form$/i })).toBeInTheDocument();
  });

  it('should switch to Project Information tab when clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('tab', { name: 'Project Information' }));

    expect(screen.getByRole('heading', { name: 'Project Information' })).toBeInTheDocument();
  });

  it('should switch back to Form tab when clicked', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('tab', { name: 'Project Information' }));

    fireEvent.click(screen.getByRole('tab', { name: 'Form Page' }));

    expect(screen.getByRole('heading', { name: /^register form$/i })).toBeInTheDocument();
  });
});
