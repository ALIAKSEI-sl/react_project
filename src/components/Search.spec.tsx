import { MemoryRouter, useSearchParams } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import { SearchTermContext } from '../contexts/contexts';
import Search from './Search';

describe('Search', () => {
  const mockSearchTermContext = {
    searchTerm: 'caterpie',
    setSearchTerm: jest.fn(),
  };

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useSearchParams: jest.fn(),
  }));

  it('изменение значения input', () => {
    render(
      <MemoryRouter>
        <SearchTermContext.Provider value={mockSearchTermContext}>
          <Search />
        </SearchTermContext.Provider>
      </MemoryRouter>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement.value).toBe('caterpie');

    fireEvent.change(inputElement, { target: { value: 'charmander' } });

    expect(mockSearchTermContext.setSearchTerm).toHaveBeenCalledWith(
      'charmander'
    );
  });

  it('изменение значения input в query params', () => {
    render(
      <MemoryRouter initialEntries={['/?search=butterfree']}>
        <SearchTermContext.Provider value={mockSearchTermContext}>
          <Search />
        </SearchTermContext.Provider>
      </MemoryRouter>
    );

    expect(mockSearchTermContext.setSearchTerm).toHaveBeenCalledWith(
      'butterfree'
    );
  });

  xit('изменение значения input в query params', () => {
    render(
      <MemoryRouter>
        <SearchTermContext.Provider value={mockSearchTermContext}>
          <Search />
        </SearchTermContext.Provider>
      </MemoryRouter>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'spearow' } });

    const buttonElement = screen.getByRole('button') as HTMLButtonElement;
    fireEvent.click(buttonElement);

    expect(useSearchParams).toHaveBeenCalledWith('spearow');
  });
});
