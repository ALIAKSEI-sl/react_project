export interface IData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Item[];
}

export interface Item {
  name: string;
  url: string;
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
