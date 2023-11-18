import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import Loader from './Loader';

describe('Loader', () => {
  it('render elements', () => {
    render(
      <MemoryRouter>
        <Loader />
      </MemoryRouter>
    );

    const containerLoader = screen.getByTestId('loader');
    expect(containerLoader).toBeInTheDocument();
  });
});
