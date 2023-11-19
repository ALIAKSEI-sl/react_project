import { Provider } from 'react-redux';
import * as Router from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

import { fireEvent, render, screen } from '@testing-library/react';

import { mockPokemon, mockPokemonContext } from '../../mocks/mockPokemon';
import { pokemonApi } from '../../store/pokemon.api';
import ListResults from './ListResults';

describe('ListResults', () => {
  const mockStore = configureMockStore();
  const initialState = {
    search: {
      page: 2,
      limit: 20,
      searchTerm: 'butterfree',
    },
  };

  const data = {
    data: {
      count: 50,
      pokemon: mockPokemon,
    },
    refetch: jest.fn(),
  };

  beforeAll(async () => {
    jest.spyOn(pokemonApi, 'usePokemonQuery').mockReturnValue(data);
  });

  it('should render no results', async () => {
    const store = mockStore(initialState);

    render(
      <Router.MemoryRouter>
        <Provider store={store}>
          <ListResults />
        </Provider>
      </Router.MemoryRouter>
    );

    // await waitFor(() => {
    const element = screen.getByText('Ничего не найдено');
    expect(element).toBeInTheDocument();
    // });
  });

  xit('should render elements', () => {
    const store = mockStore(initialState);

    render(
      <Router.MemoryRouter>
        <Provider store={store}>
          <ListResults />
        </Provider>
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

  xit('close Details', () => {
    const store = mockStore(initialState);

    render(
      <Router.MemoryRouter initialEntries={['/8?page=1&limit=20&details=8']}>
        <Router.Routes>
          <Router.Route
            path="/:id"
            element={
              <Provider store={store}>
                <ListResults />
              </Provider>
            }
          />
        </Router.Routes>
      </Router.MemoryRouter>
    );

    const element = screen.getByTestId('results');

    fireEvent.click(element);
  });
});
