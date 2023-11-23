import { useEffect, useState } from 'react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

import requestService from '../api/PokemonService';
import { ListResults, Loader, Search } from '../components/index';
import useQueryParams from '../hooks/useQueryParams';
import { IParams } from '../models/params.interface';
import { IPokemon } from '../models/response.interface';

export default function MainPage() {
  const defaultParams = { page: '1', limit: '20', details: 'false' };

  const { id } = useParams();
  const navigate = useNavigate();
  const { search: query } = useLocation();

  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [countPokemon, setCountPokemon] = useState(0);
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);

  const [params, setSearchParams] = useQueryParams();
  const { page, limit, search, details }: IParams = params;

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

  const updatePage = () => {
    if (details === 'false') {
      navigate(`/${query}`);
      getPokemon();
    } else if (!details) {
      navigate(`/${query}`);
    } else if (details && !pokemon.length) {
      getPokemon();
    }
  };

  useEffect(() => {
    if (searchParams.size) {
      if (id) {
        updatePage();
      } else {
        getPokemon();
      }
    } else {
      setSearchParams(defaultParams);
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
        <Outlet />
      </div>
    </>
  );
}
