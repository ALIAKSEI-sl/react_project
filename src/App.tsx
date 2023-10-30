import { Component } from 'react';

import { IPokemon } from './api/models';
import requestService from './api/PokemonService';
import './App.css';
import { ListResults, Loader, Search } from './components/index';

type AppProp = object;

type AppState = {
  pokemon: IPokemon[];
  isLoading: boolean;
};

export default class App extends Component<AppProp, AppState> {
  constructor(props: AppProp) {
    super(props);
    this.state = {
      pokemon: [],
      isLoading: false,
    };
  }

  updateItems = async (searchTerm: string) => {
    this.setState({ isLoading: true });
    if (searchTerm) {
      const pokemon = await requestService.getPokemonByQuery(searchTerm);
      this.setState({ pokemon: pokemon ? [pokemon] : [] });
    } else {
      const allPokemon = await requestService.getAllPokemon();
      const pokemon = allPokemon.filter(Boolean) as IPokemon[];
      this.setState({
        pokemon,
      });
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { pokemon, isLoading } = this.state;
    return (
      <>
        <Search update={this.updateItems} />
        <hr />
        {isLoading ? <Loader /> : <ListResults items={pokemon} />}
      </>
    );
  }
}
