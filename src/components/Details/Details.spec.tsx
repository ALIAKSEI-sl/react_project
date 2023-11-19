import { Provider } from 'react-redux';
import * as Router from 'react-router-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import pokemonService from '../../api/PokemonService';
import server from '../../mocks/handlers';
import { mockPokemon } from '../../mocks/mockPokemon';
import { store } from '../../store';
import Details from './Details';

describe('Details', () => {
  beforeAll(() => {
    jest
      .spyOn(pokemonService, 'getPokemonByQuery')
      .mockReturnValue(Promise.resolve(mockPokemon));

    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it(' should render details', async () => {
    render(
      <Router.MemoryRouter initialEntries={['/8?page=1&limit=20']}>
        <Provider store={store}>
          <Router.Routes>
            <Router.Route path="/:id" element={<Details />} />
          </Router.Routes>
        </Provider>
      </Router.MemoryRouter>
    );

    await waitFor(() => {
      const buttonElement = screen.getByRole('button') as HTMLButtonElement;
      expect(buttonElement).toBeInTheDocument();

      const imgElement = screen.getByRole('img') as HTMLImageElement;
      expect(imgElement).toBeInTheDocument();

      const headerElement = screen.getByRole('heading', { level: 2 });
      expect(headerElement).toBeInTheDocument();

      fireEvent.click(buttonElement);
    });
  });
});
