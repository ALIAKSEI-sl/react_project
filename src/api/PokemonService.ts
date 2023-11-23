import {
  IData,
  IItem,
  IPokemon,
  IPokemonDetails,
} from '../models/response.interface';

class PokemonService {
  private url = 'https://pokeapi.co/api/v2/pokemon/';

  async getAllPokemon(
    limit: number = 20,
    offset: number = 0
  ): Promise<IPokemonDetails> {
    const url = `${this.url}?limit=${limit}&offset=${offset}`;
    const response = await fetch(url);
    if (!response.ok) {
      return { pokemon: [], count: 0 };
    }

    const data: IData = await response.json();
    const pokemon = await Promise.all(
      data.results.map((item: IItem) => this.getPokemon(item.url))
    );
    return { count: data.count, pokemon };
  }

  async getPokemon(url: string): Promise<IPokemon> {
    const response = await fetch(url);
    return response.json();
  }

  async getPokemonByQuery(searchTerm: string): Promise<IPokemon> {
    const url = `${this.url}${searchTerm}`;
    return this.getPokemon(url);
  }
}

export default new PokemonService();
