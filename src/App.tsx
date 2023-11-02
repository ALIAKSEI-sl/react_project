import { useState } from 'react';

import { IPokemon } from './api/models';
import requestService from './api/PokemonService';
import './App.css';
import { ListResults, Loader, Search } from './components/index';

export default function App() {
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchByTerm = async (searchTerm: string) => {
    setIsLoading(true);

    if (searchTerm) {
      const pokemonByQuery = await requestService.getPokemonByQuery(searchTerm);
      setPokemon(pokemonByQuery ? [pokemonByQuery] : []);
    } else {
      const pokemonResults = await requestService.getAllPokemon();
      const allPokemon = pokemonResults.filter(Boolean) as IPokemon[];
      setPokemon(allPokemon);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Search searchByTerm={searchByTerm} />
      <hr />
      {isLoading ? <Loader /> : <ListResults items={pokemon} />}
    </>
  );
}
