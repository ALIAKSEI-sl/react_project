import { createContext } from 'react';

import { IPokemonContext } from '../models/pokemonContext.interface';
import { ISearchTermContext } from '../models/searchTermContext.interface';

export const PokemonContext = createContext<IPokemonContext>({
  pokemon: [],
  countPokemon: 0,
});

export const SearchTermContext = createContext<ISearchTermContext>({
  searchTerm: '',
  setSearchTerm: () => {},
});
