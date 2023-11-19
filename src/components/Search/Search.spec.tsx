import { Provider } from 'react-redux';
import * as Router from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

import { fireEvent, render, screen } from '@testing-library/react';

import { searchActions } from '../../store/search.slice';
import Search from './Search';

describe('Search', () => {
  const initialState = {};
  const mockStore = configureMockStore();
  const storeMocked = mockStore(initialState);

  it('should render elements', () => {
    render(
      <Router.MemoryRouter>
        <Provider store={storeMocked}>
          <Search />
        </Provider>
      </Router.MemoryRouter>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button') as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();
  });

  it('should change input value', () => {
    render(
      <Router.MemoryRouter>
        <Provider store={storeMocked}>
          <Search />
        </Provider>
      </Router.MemoryRouter>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'charmander' } });

    expect(inputElement.value).toBe('charmander');
  });

  it('should called handleSearchClick', () => {
    render(
      <Router.MemoryRouter initialEntries={['/3']}>
        <Provider store={storeMocked}>
          <Search />
        </Provider>
      </Router.MemoryRouter>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    const buttonElement = screen.getByRole('button') as HTMLButtonElement;

    fireEvent.change(inputElement, { target: { value: 'squirtle' } });
    fireEvent.click(buttonElement);

    const expectedAction = searchActions.setParams({
      searchTerm: 'squirtle',
      page: 1,
    });

    const actions = storeMocked.getActions();
    expect(actions).toEqual([expectedAction]);
  });
});
