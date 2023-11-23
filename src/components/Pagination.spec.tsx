import * as Router from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { PokemonContext } from '../contexts/contexts';
import { IPokemonContext } from '../models/pokemonContext.interface';
import Pagination from './Pagination';

describe('Pagination', () => {
  const mockPokemonContext: IPokemonContext = {
    pokemon: [],
    countPokemon: 30,
  };

  const spy = jest.spyOn(Router, 'useSearchParams');

  it('render elements', () => {
    render(
      <Router.MemoryRouter>
        <PokemonContext.Provider value={mockPokemonContext}>
          <Pagination />
        </PokemonContext.Provider>
      </Router.MemoryRouter>
    );

    const buttonElements = screen.getAllByRole('button') as HTMLButtonElement[];
    expect(buttonElements.length).toBe(2);

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement).toBeInTheDocument();
  });

  it('navigation to the next page', () => {
    render(
      <Router.MemoryRouter initialEntries={['/?page=1&limit=10']}>
        <PokemonContext.Provider value={mockPokemonContext}>
          <Pagination />
        </PokemonContext.Provider>
      </Router.MemoryRouter>
    );

    const buttonElement = screen.getByTestId('next') as HTMLButtonElement;

    spy.mockClear();
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);
    fireEvent.click(buttonElement);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('navigation to the previous page', () => {
    render(
      <Router.MemoryRouter initialEntries={['/?page=1&limit=20']}>
        <PokemonContext.Provider value={mockPokemonContext}>
          <Pagination />
        </PokemonContext.Provider>
      </Router.MemoryRouter>
    );

    const buttonPrevious = screen.getByTestId('previous') as HTMLButtonElement;
    const buttonNext = screen.getByTestId('next') as HTMLButtonElement;

    fireEvent.click(buttonNext);
    spy.mockClear();

    fireEvent.click(buttonPrevious);
    fireEvent.click(buttonPrevious);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('change limit', () => {
    render(
      <Router.MemoryRouter initialEntries={['/?page=1&limit=20']}>
        <PokemonContext.Provider value={mockPokemonContext}>
          <Pagination />
        </PokemonContext.Provider>
      </Router.MemoryRouter>
    );

    spy.mockClear();
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    fireEvent.change(selectElement, { target: { value: '10' } });
    fireEvent.change(selectElement, { target: { value: '25' } });
    fireEvent.change(selectElement, { target: { value: '15' } });

    expect(spy).toHaveBeenCalledTimes(3);
  });
});
