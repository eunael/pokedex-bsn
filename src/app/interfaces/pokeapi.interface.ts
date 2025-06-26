export interface PokemonApi {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonApiType[];
  sprites: { front_default: string };
  base_experience: number;
  abilities: AbilitiesApi[];
  stats: StatApi[];
}

export interface PokemonApiType {
  slot: number;
  type: { name: string; url: string };
}

export interface TypeApi {
  id: number;
  name: string;
  damage_relations: {
    double_damage_from: {
      name: string;
      url: string;
    }[];
  };
}

export interface AbilitiesApi {
  slot: number;
  ability: {
    name: string;
    url: string;
  };
}

export interface StatApi {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface EvoChain {
  chain: EvolvesToApi;
  id: number;
}

export interface EvolvesToApi {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolvesToApi[];
}

export interface PokemonsPaginateApi {
  count: number;
  next?: string;
  results: { name: string; url: string }[];
}
