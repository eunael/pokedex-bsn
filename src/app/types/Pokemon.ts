export type SimplePokemon = {
  id?: number;
  name: string;
  imageUrl?: string;
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  imageUrl: string;
  xp: number;
  weaknesses: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  chainEnvolution: PokemonEvolutionChain;
};

export type PokemonType = {
  slot: number;
  name: string;
  url: string;
};

export type PokemonAbility = {
  slot: number;
  name: string;
  url: string;
};

export type PokemonStat = {
  name: string;
  value: number;
  url: string;
};

export type PokemonEvolutionChain = {
  pokemon: SimplePokemon;
  evolvesTo: PokemonEvolutionChain[];
};
