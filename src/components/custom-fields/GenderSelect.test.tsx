import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import GenderSelect from './GenderSelect';
import { act } from 'react';

expect.extend(toHaveNoViolations);

describe('GenderSelect Component', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<GenderSelect gender='' setGender={jest.fn()} />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should default to no gender selected when gender prop is empty', () => {
    const { getByLabelText } = render(<GenderSelect gender='' setGender={jest.fn()} />);

    expect(getByLabelText(/^male$/i)).not.toBeChecked();
    expect(getByLabelText(/^female$/i)).not.toBeChecked();
    expect(getByLabelText(/^other$/i)).not.toBeChecked();
  });


  it('should correctly reflect the checked radio button', () => {
    const { getByLabelText } = render(<GenderSelect gender='male' setGender={jest.fn()} />);

    expect(getByLabelText(/^male$/i)).toBeChecked();
    expect(getByLabelText(/^female$/i)).not.toBeChecked();
    expect(getByLabelText(/^other$/i)).not.toBeChecked();
  });

  it('should call setGender with the correct value when a radio button is selected', async () => {
    const setGender = jest.fn();
    const { getByLabelText } = render(<GenderSelect gender='male' setGender={setGender} />);

    await act(async () => {
      fireEvent.click(getByLabelText(/female/i));
    });

    expect(setGender).toHaveBeenCalledWith('female');
  });

  it('should display an error message when provided', () => {
    const { getByRole } = render(
      <GenderSelect gender='' setGender={jest.fn()} errorMessage='Gender is required.' />
    );

    expect(getByRole('alert')).toHaveTextContent(/Gender is required./i);
  });
});
