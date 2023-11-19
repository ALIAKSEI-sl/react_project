import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import MainPage from './MainPage';

describe('MainPage', () => {
  xit('render main page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainPage />
      </MemoryRouter>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button') as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();
  });
});
