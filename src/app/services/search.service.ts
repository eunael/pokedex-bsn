import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  EvoChain,
  EvolvesToApi,
  PokemonApi,
  PokemonApiType,
  PokemonsPaginateApi,
  TypeApi,
} from '../interfaces/pokeapi.interface';
import {
  Pokemon,
  PokemonAbility,
  PokemonEvolutionChain,
  PokemonStat,
  PokemonType,
  SimplePokemon,
} from '../interfaces/pokemons.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  protected readonly pokemonUrl = `${environment.apiBaseUrl}/pokemon/`;
  protected readonly typeUrl = `${environment.apiBaseUrl}/type/`;
  protected readonly specieUrl = `${environment.apiBaseUrl}/pokemon-species/`;
  protected readonly listLimit = 20;

  constructor(protected readonly http: HttpClient) {}

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

  getPokemonsList(nextPage?: string): Observable<PokemonsPaginateApi> {
    return this.http.get<PokemonsPaginateApi>(
      nextPage ?? `${this.pokemonUrl}?offset=0&limit=${this.listLimit}`
    );
  }

  async getEvolutionChainInformations(
    pokemonId: string | number
  ): Promise<PokemonEvolutionChain[]> {
    const evoChainUrl = await fetch(this.specieUrl + pokemonId)
      .then(res => res.json())
      .then(res => res.evolution_chain.url);

    const evoChain: EvoChain = await fetch(evoChainUrl).then(res => res.json());

    const turnInPokemonEvolutionChain = async (
      evoToApi: EvolvesToApi
    ): Promise<PokemonEvolutionChain> => {
      const pokemon = await this.simpleSearchPokemon(evoToApi.species.name);

      const evolvesTo = await Promise.all(
        evoToApi.evolves_to.map(e => turnInPokemonEvolutionChain(e))
      );

      return {
        pokemon,
        evolvesTo,
      };
    };

    function turnInEvolvesToApi(evoTo: EvolvesToApi): EvolvesToApi {
      return {
        species: evoTo.species,
        evolves_to: evoTo.evolves_to.map(e => turnInEvolvesToApi(e)),
      } as EvolvesToApi;
    }

    const evolvesTo: PokemonEvolutionChain[] = [
      {
        pokemon: await this.simpleSearchPokemon(evoChain.chain.species.name),
        evolvesTo: await Promise.all(
          evoChain.chain.evolves_to.map(
            async evoTo =>
              await turnInPokemonEvolutionChain(turnInEvolvesToApi(evoTo))
          )
        ),
      },
    ];

    return evolvesTo;
  }

  async simpleSearchPokemon(id: string | number): Promise<SimplePokemon> {
    return await fetch(this.pokemonUrl + id)
      .then(res => res.json())
      .then(res => {
        return {
          id: res.id,
          name: res.name,
          imageUrl: res.sprites.front_default,
        } as SimplePokemon;
      });
  }
}
