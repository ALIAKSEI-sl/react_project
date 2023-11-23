import { IPokemon } from '../../models/response.interface';
import styles from './DetailsItem.module.css';

type IDetailsItemProps = {
  item: IPokemon;
};

export default function DetailsItem(props: IDetailsItemProps) {
  const { item } = props;

  return (
    <>
      <img
        className={styles['details-img']}
        src={item.sprites.other.dream_world.front_default}
        alt={item.name}
      />
      <h2>{item.name}</h2>
      <p>
        <strong>experience: </strong>
        {item.base_experience}
      </p>
      <p>
        <strong>types: </strong>
        {item.types.map((t) => t.type.name).join(', ')}
      </p>
      <p>
        <strong>abilities: </strong>
        {item.abilities.map((a) => a.ability.name).join(', ')}
      </p>
      <p>
        <strong>weight: </strong>
        {item.weight}
      </p>
      <p>
        <strong>height: </strong>
        {item.height}
      </p>
    </>
  );
}
