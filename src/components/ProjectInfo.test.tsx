import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ProjectInfo from './ProjectInfo';

expect.extend(toHaveNoViolations);

describe('ProjectInfo Component', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<ProjectInfo />);

    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render project title', () => {
    render(<ProjectInfo />);

    expect(screen.getByRole('heading', { name: /^project information$/i })).toBeInTheDocument();
  });

  it('should render key features section', () => {
    render(<ProjectInfo />);

    expect(screen.getByRole('heading', { name: /^key features$/i })).toBeInTheDocument();

    const featureList = screen.getByRole('list');
    expect(featureList).toBeInTheDocument();
    expect(featureList.children.length).toBe(6);
  });

  it('should render an image with alt text', () => {
    render(<ProjectInfo />);

    expect(screen.getByAltText(/^sample description$/i)).toBeInTheDocument();
  });

  it('should render a link to official documentation', () => {
    render(<ProjectInfo />);

    expect(screen.getByRole('link', { name: /official documentation/i })).toBeInTheDocument();
  });
});
