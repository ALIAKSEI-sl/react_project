import { NavLink, useLocation } from 'react-router-dom';

import useQueryParams from '../hooks/useQueryParams';
import { IPokemon } from '../models/response.interface';

type ItemProps = {
  item: IPokemon;
};

export default function ItemResults(props: ItemProps) {
  const { item } = props;
  const { search } = useLocation();
  const link = String(item.id) + search;

  const [params, setSearchParams] = useQueryParams();

  const handleItemClick = () => {
    setSearchParams({ ...params, details: String(item.id) });
  };

  return (
    <NavLink to={link} onClick={handleItemClick}>
      <li className="card">
        <img
          className="card-img"
          src={item.sprites.other.dream_world.front_default}
          alt={item.name}
        />
        <h2>{item.name}</h2>
        <p>
          <strong>types: </strong>
          {item.types.map((t) => t.type.name).join(', ')}
        </p>
      </li>
    </NavLink>
  );
}
