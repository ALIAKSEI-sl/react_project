import * as Router from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { SearchTermContext } from '../contexts/contexts';
import { ISearchTermContext } from '../models/searchTermContext.interface';
import Search from './Search';

describe('Search', () => {
  const mockSearchTermContext: ISearchTermContext = {
    searchTerm: 'caterpie',
    setSearchTerm: jest.fn(),
  };

  const spy = jest.spyOn(Router, 'useSearchParams');

  it('render elements', () => {
    render(
      <Router.MemoryRouter>
        <SearchTermContext.Provider value={mockSearchTermContext}>
          <Search />
        </SearchTermContext.Provider>
      </Router.MemoryRouter>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button') as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();
  });

  it('change input value', () => {
    render(
      <Router.MemoryRouter>
        <SearchTermContext.Provider value={mockSearchTermContext}>
          <Search />
        </SearchTermContext.Provider>
      </Router.MemoryRouter>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('caterpie');

    fireEvent.change(inputElement, { target: { value: 'charmander' } });

    expect(mockSearchTermContext.setSearchTerm).toHaveBeenCalledWith(
      'charmander'
    );
  });

  it('change input value if search query params exists', () => {
    render(
      <Router.MemoryRouter initialEntries={['/?search=butterfree']}>
        <SearchTermContext.Provider value={mockSearchTermContext}>
          <Search />
        </SearchTermContext.Provider>
      </Router.MemoryRouter>
    );

    expect(mockSearchTermContext.setSearchTerm).toHaveBeenCalledWith(
      'butterfree'
    );
  });

  it('change search query params', () => {
    render(
      <Router.MemoryRouter>
        <SearchTermContext.Provider value={mockSearchTermContext}>
          <Search />
        </SearchTermContext.Provider>
      </Router.MemoryRouter>
    );

    spy.mockClear();
    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'spearow' } });

    const buttonElement = screen.getByRole('button') as HTMLButtonElement;
    fireEvent.click(buttonElement);

    expect(spy).toHaveBeenCalled();

    fireEvent.click(buttonElement);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
