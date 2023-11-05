import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import requestService from '../api/PokemonService';
import { IParams } from '../models/params.interface';
import { IPokemon } from '../models/response.interface';
import Loader from './Loader';

export default function Details() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemon, setPokemon] = useState<IPokemon>();
  const [isLoading, setIsLoading] = useState(false);

  const params: IParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    if (!params.details) {
      setSearchParams({ ...params, details: 'false' });
    }
  }, []);

  const getPokemon = async (id: string) => {
    setIsLoading(true);

    const pokemonById = await requestService.getPokemonByQuery(id);
    if (pokemonById) {
      setPokemon(pokemonById);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (
      params.details &&
      params.details !== 'false' &&
      params.details !== 'close'
    ) {
      getPokemon(params.details);
    }
  }, [searchParams]);

  const closeDetails = () => {
    setSearchParams({ ...params, details: 'close' });
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
          {pokemon ? (
            <>
              <img
                className="details-img"
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
              />
              <h2>{pokemon.name}</h2>
              <p>
                <strong>experience: </strong>
                {pokemon.base_experience}
              </p>
              <p>
                <strong>types: </strong>
                {pokemon.types.map((t) => t.type.name).join(', ')}
              </p>
              <p>
                <strong>abilities: </strong>
                {pokemon.abilities.map((a) => a.ability.name).join(', ')}
              </p>
              <p>
                <strong>weight: </strong>
                {pokemon.weight}
              </p>
              <p>
                <strong>height: </strong>
                {pokemon.height}
              </p>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}
