import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import requestService from '../api/PokemonService';
import { ListResults, Loader, Search } from '../components/index';
import { IParams } from '../models/params.interface';
import { IPokemon } from '../models/response.interface';

export default function MainPage() {
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);
  const [countPokemon, setCountPokemon] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const { page, limit, search, details }: IParams = Object.fromEntries(
    searchParams.entries()
  );

  const getPokemon = async () => {
    setIsLoading(true);

    if (search) {
      const pokemonByQuery = await requestService.getPokemonByQuery(search);
      setPokemon(pokemonByQuery ? [pokemonByQuery] : []);
      setCountPokemon(pokemonByQuery ? 1 : 0);
    } else {
      const limitN = Number(limit) || 20;
      const offset = (Number(page) - 1) * limitN;
      const results = await requestService.getAllPokemon(limitN, offset);
      const allPokemon = results.pokemon.filter(Boolean) as IPokemon[];
      setCountPokemon(results.count);
      setPokemon(allPokemon);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (details === 'false') {
      getPokemon();
    }
  }, [searchParams]);

  return (
    <>
      <Search />
      <hr />
      <div className="layout">
        {isLoading ? (
          <Loader />
        ) : (
          <ListResults items={pokemon} count={countPokemon} />
        )}
        {details !== 'false' && details !== 'close' && <Outlet />}
      </div>
    </>
  );
}
