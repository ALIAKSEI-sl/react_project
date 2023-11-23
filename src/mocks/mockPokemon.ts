import { IPokemonContext } from '../models/pokemonContext.interface';
import { IPokemon } from '../models/response.interface';

export const mockPokemonContextEmpty: IPokemonContext = {
  pokemon: [],
  countPokemon: 0,
};

export const mockPokemon: IPokemon = {
  id: 8,
  weight: 225,
  height: 10,
  name: 'wartortle',
  base_experience: 142,
  sprites: {
    other: {
      dream_world: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/8.svg',
      },
    },
  },
  types: [
    {
      type: {
        name: 'water',
        url: 'https://pokeapi.co/api/v2/type/11/',
      },
    },
  ],
  abilities: [
    {
      ability: {
        name: 'torrent',
        url: 'https://pokeapi.co/api/v2/ability/67/',
      },
    },
  ],
};

export const mockPokemonContext: IPokemonContext = {
  pokemon: [
    {
      id: 8,
      weight: 225,
      height: 10,
      name: 'wartortle',
      base_experience: 142,
      sprites: {
        other: {
          dream_world: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/8.svg',
          },
        },
      },
      types: [
        {
          type: {
            name: 'water',
            url: 'https://pokeapi.co/api/v2/type/11/',
          },
        },
      ],
      abilities: [
        {
          ability: {
            name: 'torrent',
            url: 'https://pokeapi.co/api/v2/ability/67/',
          },
        },
      ],
    },
  ],
  countPokemon: 20,
};
