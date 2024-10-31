import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Navbar from './Navbar';

expect.extend(toHaveNoViolations);

describe('Navbar Component', () => {
  const mockSetActiveTab = jest.fn();

  it('should not have any accessibility violations', async () => {
    const { container } = render(
      <Navbar activeTab='form' setActiveTab={mockSetActiveTab} />
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should set active tab to form when the form tab is clicked', () => {
    render(<Navbar activeTab='projectInfo' setActiveTab={mockSetActiveTab} />);

    fireEvent.click(screen.getByRole('tab', { name: 'Form Page' }));

    expect(mockSetActiveTab).toHaveBeenCalledWith('form');
  });

  it('should set active tab to projectInfo when the project info tab is clicked', () => {
    render(<Navbar activeTab='form' setActiveTab={mockSetActiveTab} />);

    fireEvent.click(screen.getByRole('tab', { name: 'Project Information' }));

    expect(mockSetActiveTab).toHaveBeenCalledWith('projectInfo');
  });

  it('should call setActiveTab with form when the form tab is activated using Enter key', () => {
    render(<Navbar activeTab='projectInfo' setActiveTab={mockSetActiveTab} />);

    const formTab = screen.getByRole('tab', { name: 'Form Page' });
    fireEvent.keyDown(formTab, { key: 'Enter', code: 'Enter' });

    expect(mockSetActiveTab).toHaveBeenCalledWith('form');
  });

  it('should call setActiveTab with projectInfo when the project info tab is activated using Enter key', () => {
    render(<Navbar activeTab='form' setActiveTab={mockSetActiveTab} />);

    const projectInfoTab = screen.getByRole('tab', { name: 'Project Information' });
    fireEvent.keyDown(projectInfoTab, { key: 'Enter', code: 'Enter' });

    expect(mockSetActiveTab).toHaveBeenCalledWith('projectInfo');
  });

  it('should call setActiveTab with form when the form tab is activated using Space key', () => {
    render(<Navbar activeTab='projectInfo' setActiveTab={mockSetActiveTab} />);

    const formTab = screen.getByRole('tab', { name: 'Form Page' });
    fireEvent.keyDown(formTab, { key: ' ', code: 'Space' });

    expect(mockSetActiveTab).toHaveBeenCalledWith('form');
  });

  it('should call setActiveTab with projectInfo when the project info tab is activated using Space key', () => {
    render(<Navbar activeTab='form' setActiveTab={mockSetActiveTab} />);

    const projectInfoTab = screen.getByRole('tab', { name: 'Project Information' });
    fireEvent.keyDown(projectInfoTab, { key: ' ', code: 'Space' });

    expect(mockSetActiveTab).toHaveBeenCalledWith('projectInfo');
  });
});
