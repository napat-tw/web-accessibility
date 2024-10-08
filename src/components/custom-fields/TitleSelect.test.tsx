import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import TitleSelect from './TitleSelect';
import { act } from 'react';

expect.extend(toHaveNoViolations);

describe('TitleSelect Component', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<TitleSelect title='' setTitle={jest.fn()} />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should reflect empty value', () => {
    const { getByLabelText } = render(<TitleSelect title='' setTitle={jest.fn()} />);

    expect(getByLabelText(/title/i)).toHaveValue('');
  });

  it('should reflect selected title', () => {
    const { getByLabelText } = render(<TitleSelect title='mr' setTitle={jest.fn()} />);

    expect(getByLabelText(/title/i)).toHaveValue('mr');
  });

  it('should call setTitle when a new title is selected', async () => {
    const setTitle = jest.fn();
    const { getByLabelText } = render(<TitleSelect title='mr' setTitle={setTitle} />);

    await act(async () => {
      fireEvent.change(getByLabelText(/title/i), { target: { value: 'ms' } });
    });

    expect(setTitle).toHaveBeenCalledWith('ms');
  });

  it('should display an error message when provided', () => {
    const { getByRole } = render(
      <TitleSelect title='' setTitle={jest.fn()} errorMessage='Title is required.' />
    );

    expect(getByRole('alert')).toHaveTextContent(/^title is required.$/i);
  });
});
