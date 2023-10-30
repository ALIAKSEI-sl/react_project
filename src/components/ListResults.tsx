import { IPokemon } from '../api/models';
import ItemResults from './ItemResult';

type ListProp = {
  items: IPokemon[];
};

export default function ListResults(props: ListProp) {
  const { items } = props;
  if (!items.length) {
    return <p>Ничего не найдено</p>;
  }
  return (
    <div className="container">
      {items.map((p) => (
        <ItemResults item={p} key={p.id} />
      ))}
    </div>
  );
}
