import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

function ErrorElement() {
  throw new Error('Упс, произошла ошибка.');
  return <div />;
}

describe('ErrorBoundary', () => {
  it('render no error elements', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <div>No error</div>
        </ErrorBoundary>
      </MemoryRouter>
    );

    const element = screen.getByText('No error');
    expect(element).toBeInTheDocument();
  });

  it('render error elements', () => {
    render(
      <MemoryRouter>
        <ErrorBoundary>
          <ErrorElement />
        </ErrorBoundary>
      </MemoryRouter>
    );

    const element = screen.getByText(
      'Произошла ошибка. Пожалуйста, обновите страницу.'
    );
    expect(element).toBeInTheDocument();
  });
});
