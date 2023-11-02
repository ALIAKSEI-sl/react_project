import { IData, IPokemon, Item } from './models';

class PokemonService {
  private url = 'https://pokeapi.co/api/v2/pokemon/';

  async getAllPokemon() {
    const response = await fetch(this.url);
    if (!response.ok) {
      return [];
    }
    const data: IData = await response.json();
    const pokemonList = await Promise.all(
      data.results.map((item: Item) => this.getPokemon(item.url))
    );
    return pokemonList;
  }

  async getPokemon(url: string): Promise<Nullable<IPokemon>> {
    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    }
    return null;
  }

  async getPokemonByQuery(searchTerm: string) {
    const url = `${this.url}${searchTerm}`;
    return this.getPokemon(url);
  }
}

export default new PokemonService();
