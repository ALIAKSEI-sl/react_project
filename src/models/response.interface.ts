export interface IData {
  count: number;
  next: Nullable<string>;
  previous: Nullable<string>;
  results: IItem[];
}

export interface IItem {
  name: string;
  url: string;
}

export interface IPokemonDetails {
  count: number;
  pokemon: IPokemon[];
}

export interface IPokemon {
  id: number;
  weight: number;
  height: number;
  name: string;
  base_experience: number;
  sprites: ISprites;
  types: IType[];
  abilities: IAbility[];
}

interface ISprites {
  other: {
    dream_world: {
      front_default: string;
    };
  };
}

interface IType {
  type: {
    name: string;
    url: string;
  };
}

interface IAbility {
  ability: {
    name: string;
    url: string;
  };
}
