import { NavLink, useLocation } from 'react-router-dom';

import { IPokemon } from '../../models/response.interface';
import styles from './ItemResults.module.css';

type ItemProps = {
  item: IPokemon;
};

export default function ItemResults(props: ItemProps) {
  const { item } = props;
  const { search } = useLocation();
  const link = String(item.id) + search;

  const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <NavLink to={link} onClick={handleItemClick}>
      <li className={styles.card}>
        <img
          className={styles['card-img']}
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
