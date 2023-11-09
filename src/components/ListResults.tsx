import { MouseEventHandler } from 'react';
import { useParams } from 'react-router-dom';

import useQueryParams from '../hooks/useQueryParams';
import { IPokemon } from '../models/response.interface';
import ItemResults from './ItemResults';
import Pagination from './Pagination';

type ListProps = {
  items: IPokemon[];
  count: number;
};

export default function ListResults(props: ListProps) {
  const { id } = useParams();
  const { items, count } = props;

  const [params, setSearchParams] = useQueryParams();

  const handleItemClick: MouseEventHandler<HTMLDivElement> = async (event) => {
    const classes = ['container-results', 'block-results'];
    const elem = event.target as HTMLElement;
    const isClose = classes.some((name) => elem.classList.contains(name));
    if (id && isClose) {
      delete params.details;
      setSearchParams({ ...params });
    }
  };

  if (!items.length) {
    return <p>Ничего не найдено</p>;
  }

  return (
    <div className="container-results" onClick={handleItemClick}>
      <Pagination count={count} />
      <ul className="block-results">
        {items.map((item) => (
          <ItemResults item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
