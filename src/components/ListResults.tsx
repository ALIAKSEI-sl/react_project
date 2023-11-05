import { MouseEventHandler } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IParams } from '../models/params.interface';
import { IPokemon } from '../models/response.interface';
import ItemResults from './ItemResults';
import Pagination from './Pagination';

type ListProps = {
  items: IPokemon[];
  count: number;
};

export default function ListResults(props: ListProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const params: IParams = Object.fromEntries(searchParams.entries());

  const { items, count } = props;

  if (!items.length) {
    return <p>Ничего не найдено</p>;
  }

  const handleItemClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const classes = ['container-results', 'block-results'];
    const elem = event.target as HTMLElement;
    const isClose = classes.some((name) => elem.classList.contains(name));
    if (isClose) {
      setSearchParams({ ...params, details: 'close' });
    }
  };

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
