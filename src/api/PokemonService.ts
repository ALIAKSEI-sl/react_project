import { IData, IPokemon, Items } from './models';

class PokemonService {
  async getAllPokemon() {
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=20';
    const response = await fetch(url);
    if (!response.ok) {
      return [];
    }
    const data: IData = await response.json();
    const pokemonList = await Promise.all(
      data.results.map((p: Items) => this.getPokemon(p.url))
    );
    return pokemonList;
  }

  async getPokemon(url: string): Promise<IPokemon | null> {
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
