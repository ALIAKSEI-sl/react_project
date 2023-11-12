import * as Router from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { PokemonContext } from '../contexts/contexts';
import {
  mockPokemonContext,
  mockPokemonContextEmpty,
} from '../mocks/mockPokemon';
import ListResults from './ListResults';

describe('ListResults', () => {
  const spy = jest.spyOn(Router, 'useSearchParams');

  it('no results', () => {
    render(
      <Router.MemoryRouter>
        <PokemonContext.Provider value={mockPokemonContextEmpty}>
          <ListResults />
        </PokemonContext.Provider>
      </Router.MemoryRouter>
    );

    const element = screen.getByText('Ничего не найдено');
    expect(element).toBeInTheDocument();
  });

  it('render elements', () => {
    render(
      <Router.MemoryRouter>
        <PokemonContext.Provider value={mockPokemonContext}>
          <ListResults />
        </PokemonContext.Provider>
      </Router.MemoryRouter>
    );

    const container = screen.getByTestId('results');
    expect(container).toBeInTheDocument();

    const listItem = screen.getAllByRole('listitem');
    expect(listItem.length).toBe(mockPokemonContext.pokemon.length);

    const buttonElements = screen.getAllByRole('button') as HTMLButtonElement[];
    expect(buttonElements.length).toBe(2);

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement).toBeInTheDocument();
  });

  it('close Details', () => {
    render(
      <Router.MemoryRouter initialEntries={['/8?page=1&limit=20&details=8']}>
        <Router.Routes>
          <Router.Route
            path="/:id"
            element={
              <PokemonContext.Provider value={mockPokemonContext}>
                <ListResults />
              </PokemonContext.Provider>
            }
          />
        </Router.Routes>
      </Router.MemoryRouter>
    );

    const element = screen.getByTestId('results');
    spy.mockClear();

    fireEvent.click(element);
    expect(spy).toHaveBeenCalled();
  });
});
