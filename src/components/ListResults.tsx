import { MouseEventHandler, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { PokemonContext } from '../contexts/contexts';
import useQueryParams from '../hooks/useQueryParams';
import ItemResults from './ItemResults';
import Pagination from './Pagination';

export default function ListResults() {
  const { id } = useParams();
  const context = useContext(PokemonContext);

  const [params, setSearchParams] = useQueryParams();

  const handleItemClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const classes = ['container-results', 'block-results'];
    const elem = event.target as HTMLElement;
    const isClose = classes.some((name) => elem.classList.contains(name));
    if (id && isClose) {
      delete params.details;
      setSearchParams({ ...params });
    }
  };

  if (!context.pokemon.length) {
    return <p>Ничего не найдено</p>;
  }

  return (
    <div
      className="container-results"
      onClick={handleItemClick}
      data-testid="results"
    >
      <Pagination />
      <ul className="block-results">
        {context.pokemon.map((item) => (
          <ItemResults item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
