import { IData, IPokemon, Item } from './models';

type Nullable<T> = T | null;

class PokemonService {
  private url = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

  async getAllPokemon() {
    const response = await fetch(this.url);
    if (!response.ok) {
      return [];
    }
    const data: IData = await response.json();
    const pokemonList = await Promise.all(
      data.results.map((p: Item) => this.getPokemon(p.url))
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
    const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;
    return this.getPokemon(url);
  }
}

export default new PokemonService();
