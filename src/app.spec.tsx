import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  xit('render elements', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const inputElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole('button') as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();
  });
});
