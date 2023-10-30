import { IPokemon } from '../api/models';
import ItemResults from './ItemResults';

type ListProp = {
  items: IPokemon[];
};

export default function ListResults(props: ListProp) {
  const { items } = props;
  if (!items.length) {
    return <p>Ничего не найдено</p>;
  }
  return (
    <ul className="container">
      {items.map((item) => (
        <ItemResults item={item} key={item.id} />
      ))}
    </ul>
  );
}
