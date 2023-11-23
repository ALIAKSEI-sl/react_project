import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { render, screen, waitFor } from '@testing-library/react';

import pokemonService from '../../api/PokemonService';
import server from '../../mocks/handlers';
import { mockPokemonResponse } from '../../mocks/mockPokemon';
import { store } from '../../store';
import MainPage from './MainPage';

describe('should render MainPage', () => {
  beforeAll(() => {
    jest
      .spyOn(pokemonService, 'getAllPokemon')
      .mockReturnValue(Promise.resolve(mockPokemonResponse));

    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render main page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <MainPage />
        </Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      const inputElement = screen.getByRole('textbox') as HTMLInputElement;
      expect(inputElement).toBeInTheDocument();

      const buttonElement = screen.getByRole('button') as HTMLButtonElement;
      expect(buttonElement).toBeInTheDocument();
    });
  });
});
