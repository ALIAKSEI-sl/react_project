import { useSearchParams } from 'react-router-dom';

import { IParams } from '../models/params.interface';
import { IPokemon } from '../models/response.interface';

type ItemProps = {
  item: IPokemon;
};

export default function ItemResults(props: ItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const params: IParams = Object.fromEntries(searchParams.entries());

  const { item } = props;

  const handleItemClick = () => {
    setSearchParams({ ...params, details: String(item.id) });
  };

  return (
    <li className="card" onClick={handleItemClick}>
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
  );
}
