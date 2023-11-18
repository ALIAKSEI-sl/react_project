import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import { mockPokemon } from '../../mocks/mockPokemon';
import DetailsItem from './DetailsItem';

describe('DetailsItem', () => {
  it('render elements', () => {
    render(
      <MemoryRouter initialEntries={['/8']}>
        <DetailsItem item={mockPokemon} />
      </MemoryRouter>
    );

    const imgElement = screen.getByRole('img') as HTMLImageElement;
    expect(imgElement.src).toBe(
      mockPokemon.sprites.other.dream_world.front_default
    );

    const headerElement = screen.getByRole('heading', { level: 2 });
    expect(headerElement.textContent).toBe(mockPokemon.name);

    const experienceElement = screen.getByText(mockPokemon.base_experience);
    expect(experienceElement).toBeInTheDocument();

    const types = mockPokemon.types.map((t) => t.type.name).join(', ');
    const typesElement = screen.getByText(types);
    expect(typesElement).toBeInTheDocument();

    const abilities = mockPokemon.abilities
      .map((a) => a.ability.name)
      .join(', ');
    const abilitiesElement = screen.getByText(abilities);
    expect(abilitiesElement).toBeInTheDocument();

    const weightElement = screen.getByText(mockPokemon.weight);
    expect(weightElement).toBeInTheDocument();

    const heightElement = screen.getByText(mockPokemon.height);
    expect(heightElement).toBeInTheDocument();
  });
});
