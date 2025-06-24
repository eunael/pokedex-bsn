import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Pokemon,
  PokemonAbility,
  PokemonEvolutionChain,
  PokemonStat,
  PokemonType,
} from '../types/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly pokemonUrl = `${environment.apiBaseUrl}pokemon/`;
  private readonly typeUrl = `${environment.apiBaseUrl}type/`;
  private readonly specieUrl = `${environment.apiBaseUrl}pokemon-species/`;

  constructor(private http: HttpClient) {}

  searchPokemonByIdOrName(id: string | number): Observable<Pokemon> {
    return this.http.get<PokemonApi>(this.pokemonUrl + id).pipe(
      map((data: PokemonApi) => {
        const weaknesses: PokemonType[] = []; // todo: filtrar duplicados
        data.types.map((type: PokemonApiType) => {
          return this.getTypeInformations(type.slot).subscribe({
            next: (typeData: TypeApi) => {
              typeData.damage_relations.double_damage_from.forEach(
                damageFrom => {
                  const url = damageFrom.url;
                  const match = url.match(/\/(\d+)\/?$/);
                  const slot = match ? Number(match[1]) : null;

                  weaknesses.push({
                    slot: slot,
                    name: damageFrom.name,
                    url: damageFrom.url,
                  } as PokemonType);
                }
              );
            },
          });
        });

        const pokemon = {
          id: data.id,
          name: data.name,
          height: data.height,
          weight: data.weight,
          types: data.types.map((type: PokemonApiType) => {
            return {
              slot: type.slot,
              name: type.type.name,
              url: type.type.url,
            } as PokemonType;
          }),
          imageUrl: data.sprites.front_default,
          xp: data.base_experience,
          weaknesses: weaknesses,
          abilities: data.abilities.map(ability => {
            return {
              slot: ability.slot,
              name: ability.ability.name,
              url: ability.ability.url,
            } as PokemonAbility;
          }),
          stats: data.stats.map(stat => {
            return {
              name: stat.stat.name,
              value: stat.base_stat,
              url: stat.stat.url,
            } as PokemonStat;
          }),
        } as Pokemon;

        return pokemon;
      })
    );
  }

  getTypeInformations(id: string | number): Observable<TypeApi> {
    return this.http.get<TypeApi>(this.typeUrl + id).pipe(
      map((data: TypeApi) => {
        return {
          id: data.id,
          name: data.name,
          damage_relations: {
            double_damage_from: data.damage_relations.double_damage_from,
          },
        } as TypeApi;
      })
    );
  }

  async getEvolutionChainInformations(
    pokemonId: string | number
  ): Promise<PokemonEvolutionChain[]> {
    const evoChainUrl = await fetch(this.specieUrl + pokemonId)
      .then(res => res.json())
      .then(res => res.evolution_chain.url);

    return await fetch(evoChainUrl)
      .then(res => res.json())
      .then((evoChain: EvoChain) => {
        function turnInPokemonEvolutionChain(
          evoToApi: EvolvesToApi
        ): PokemonEvolutionChain {
          const pokemon = evoToApi.species.name;
          const evolvesTo = evoToApi.evolves_to.map(e =>
            turnInPokemonEvolutionChain(e)
          );

          return {
            pokemon,
            evolvesTo,
          } as PokemonEvolutionChain;
        }

        function turnInEvolvesToApi(evoTo: EvolvesToApi): EvolvesToApi {
          return {
            species: evoTo.species,
            evolves_to: evoTo.evolves_to.map(e => turnInEvolvesToApi(e)),
          } as EvolvesToApi;
        }

        const evolvesTo: PokemonEvolutionChain[] = [
          {
            pokemon: evoChain.chain.species.name,
            evolvesTo: evoChain.chain.evolves_to.map(evoTo => {
              return turnInPokemonEvolutionChain(turnInEvolvesToApi(evoTo));
            }),
          },
        ];

        return evolvesTo;
      });
  }
}

type PokemonApi = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonApiType[];
  sprites: { front_default: string };
  base_experience: number;
  abilities: AbilitiesApi[];
  stats: StatApi[];
};

type PokemonApiType = {
  slot: number;
  type: { name: string; url: string };
};

type TypeApi = {
  id: number;
  name: string;
  damage_relations: {
    double_damage_from: {
      name: string;
      url: string;
    }[];
  };
};

type AbilitiesApi = {
  slot: number;
  ability: {
    name: string;
    url: string;
  };
};

type StatApi = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type EvoChain = {
  chain: EvolvesToApi;
  id: number;
};

export type EvolvesToApi = {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolvesToApi[];
};
