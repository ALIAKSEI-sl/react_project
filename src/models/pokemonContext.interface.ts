import { IPokemon } from './response.interface';

export interface IPokemonContext {
  pokemon: IPokemon[];
  countPokemon: number;
}
