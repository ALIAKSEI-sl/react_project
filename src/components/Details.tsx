import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import requestService from '../api/PokemonService';
import useQueryParams from '../hooks/useQueryParams';
import { IPokemon } from '../models/response.interface';
import DetailsItem from './DetailsItem';
import Loader from './Loader';

export default function Details() {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState<IPokemon>();
  const [isLoading, setIsLoading] = useState(false);
  const [params, setSearchParams] = useQueryParams();

  const getPokemon = async (pokemonId: string) => {
    setIsLoading(true);

    const pokemonById = await requestService.getPokemonByQuery(pokemonId);
    if (pokemonById) {
      setPokemon(pokemonById);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      setSearchParams({ ...params, details: id });
      getPokemon(id);
    }
  }, [id]);

  const closeDetails = () => {
    delete params.details;
    setSearchParams({ ...params });
  };

  return (
    <div className="container-details">
      <p className="header-details">details</p>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <button
            type="button"
            onClick={closeDetails}
            className="details-close"
          >
            X
          </button>
          {pokemon && <DetailsItem item={pokemon} />}
        </>
      )}
    </div>
  );
}
