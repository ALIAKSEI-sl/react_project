import { IPokemon } from '../api/models';
import ItemResults from './ItemResults';

type ListProps = {
  items: IPokemon[];
};

export default function ListResults(props: ListProps) {
  const { items } = props;
  if (!items.length) {
    return <p>Ничего не найдено</p>;
  }
  return (
    <ul className="container-results">
      {items.map((item) => (
        <ItemResults item={item} key={item.id} />
      ))}
    </ul>
  );
}
