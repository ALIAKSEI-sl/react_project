import { Component } from 'react';
import { IPokemon } from '../api/models';
import ItemResults from './ItemResult';

type ListProp = {
  items: IPokemon[];
};

type ListState = object;

export default class ListResults extends Component<ListProp, ListState> {
  constructor(props: ListProp) {
    super(props);
    this.state = {};
  }

  render() {
    const { items } = this.props;
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
}
