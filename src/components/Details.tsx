import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { PokemonContext } from '../contexts/contexts';
import useQueryParams from '../hooks/useQueryParams';
import { IPokemon } from '../models/response.interface';
import DetailsItem from './DetailsItem';
import Loader from './Loader';

export default function Details() {
  const { id } = useParams();
  const context = useContext(PokemonContext);

  const [pokemon, setPokemon] = useState<IPokemon>();
  const [params, setSearchParams] = useQueryParams();

  useEffect(() => {
    const details = context.pokemon.find((item) => String(item.id) === id);
    setPokemon(details);
  }, [context]);

  useEffect(() => {
    if (id) {
      setSearchParams({ ...params, details: id });
      const details = context.pokemon.find((item) => String(item.id) === id);
      setPokemon(details);
    }
  }, [id]);

  const closeDetails = () => {
    delete params.details;
    setSearchParams({ ...params });
  };

  return (
    <div className="container-details">
      <p className="header-details">details</p>
      {!pokemon ? (
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
