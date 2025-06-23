export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  imageUrl: string;
};

export type PokemonType = {
  slot: number;
  name: string;
  url: string;
};
