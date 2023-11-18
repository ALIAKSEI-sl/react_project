import * as Router from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { mockPokemonContext } from '../../mocks/mockPokemon';
import { PokemonContext } from '../contexts/contexts';
import Details from './Details';

describe('Details', () => {
  const spy = jest.spyOn(Router, 'useSearchParams');

  it('render Loader', () => {
    render(
      <Router.MemoryRouter initialEntries={['/8?page=1&limit=20&details=8']}>
        <PokemonContext.Provider value={mockPokemonContext}>
          <Details />
        </PokemonContext.Provider>
      </Router.MemoryRouter>
    );

    const containerLoader = screen.getByTestId('loader');
    expect(containerLoader).toBeInTheDocument();
  });

  it('render details', () => {
    render(
      <Router.MemoryRouter initialEntries={['/8?page=1&limit=20&details=8']}>
        <Router.Routes>
          <Router.Route
            path="/:id"
            element={
              <PokemonContext.Provider value={mockPokemonContext}>
                <Details />
              </PokemonContext.Provider>
            }
          />
        </Router.Routes>
      </Router.MemoryRouter>
    );

    const buttonElement = screen.getByRole('button') as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();

    const imgElement = screen.getByRole('img') as HTMLImageElement;
    expect(imgElement).toBeInTheDocument();

    const headerElement = screen.getByRole('heading', { level: 2 });
    expect(headerElement).toBeInTheDocument();

    screen.debug();
  });

  it('close details', () => {
    render(
      <Router.MemoryRouter initialEntries={['/8?page=1&limit=20&details=8']}>
        <Router.Routes>
          <Router.Route
            path="/:id"
            element={
              <PokemonContext.Provider value={mockPokemonContext}>
                <Details />
              </PokemonContext.Provider>
            }
          />
        </Router.Routes>
      </Router.MemoryRouter>
    );

    const buttonElement = screen.getByRole('button') as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();
    spy.mockClear();
    fireEvent.click(buttonElement);

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
