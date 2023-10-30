export interface IData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Items[];
}

export interface Items {
  name: string;
  url: string;
}

export interface IPokemon {
  id: number;
  weight: number;
  height: number;
  name: string;
  base_experience: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: IType[];
  abilities: IAbility[];
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
