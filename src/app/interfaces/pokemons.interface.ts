export interface SimplePokemon {
  id?: number;
  name: string;
  imageUrl?: string;
}

export interface Pokemon {
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
}

export interface PokemonType {
  slot: number;
  name: string;
  url: string;
}

export interface PokemonAbility {
  slot: number;
  name: string;
  url: string;
}

export interface PokemonStat {
  name: string;
  value: number;
  url: string;
}

export interface PokemonEvolutionChain {
  pokemon: SimplePokemon;
  evolvesTo: PokemonEvolutionChain[];
}
