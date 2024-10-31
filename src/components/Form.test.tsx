import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Form from './Form';

expect.extend(toHaveNoViolations);

describe('Form Component', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<Form />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should show error messages when fields are invalid', async () => {
    render(<Form />);

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByRole('alert')).toHaveTextContent(/^! title is required.$/i);
    expect(screen.queryByText(/^! name is required.$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^! email is required, Please enter a valid email address.$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^! gender is required.$/i)).not.toBeInTheDocument();
  });

  it('should show error messages when fields are invalid by sequential', async () => {
    render(<Form />);

    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'mr' } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.queryByText(/^! title is required.$/i)).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent(/^! name is required.$/i);
    expect(screen.queryByText(/^! email is required, Please enter a valid email address.$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^! gender is required.$/i)).not.toBeInTheDocument();
  });

  it('should show success message when form is valid', async () => {
    render(<Form />);

    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'mr' } });
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john.doe@example.com' } });
    fireEvent.click(screen.getByLabelText(/^male$/i));

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByRole('alert')).toHaveTextContent(/^form submitted successfully!$/i);
  });
});
