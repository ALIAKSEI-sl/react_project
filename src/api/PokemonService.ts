import { IData, IPokemon, Item } from '../models/response.interface';

class PokemonService {
  private url = 'https://pokeapi.co/api/v2/pokemon/';

  async getAllPokemon(limit: number = 20, offset: number = 0) {
    const url = `${this.url}?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    if (!response.ok) {
      return { pokemon: [], count: 0 };
    }
    const data: IData = await response.json();
    const pokemon = await Promise.all(
      data.results.map((item: Item) => this.getPokemon(item.url))
    );
    return { pokemon, count: data.count };
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
