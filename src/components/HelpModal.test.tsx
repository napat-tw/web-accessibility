import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import HelpModal from './HelpModal';

expect.extend(toHaveNoViolations);

describe('HelpModal Component', () => {
  const mockHandleClose = jest.fn();

  it('should not have any accessibility violations', async () => {
    const { container } = render(<HelpModal handleClose={mockHandleClose} />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should call handleClose when the close button is clicked', () => {
    render(<HelpModal handleClose={mockHandleClose} />);

    fireEvent.click(screen.getByLabelText(/^close help modal$/i));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it('should close the modal on ESC key press', () => {
    render(<HelpModal handleClose={mockHandleClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
