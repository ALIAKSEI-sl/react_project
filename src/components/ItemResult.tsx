import { IPokemon } from '../api/models';

type ItemProp = {
  item: IPokemon;
};

export default function ItemResults(props: ItemProp) {
  const { item } = props;
  return (
    <div className="card">
      <img
        className="card-img"
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
    </div>
  );
}
