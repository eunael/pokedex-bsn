import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonType } from '../types/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private readonly pokemonUrl = `${environment.apiBaseUrl}/pokemon/`;

  constructor(private http: HttpClient) {}

  searchPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<PokemonApi>(this.pokemonUrl + name).pipe(
      map((data: PokemonApi) => {
        return {
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
        } as Pokemon;
      })
    );
  }
}

type PokemonApi = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonApiType[];
  sprites: { front_default: string };
};

type PokemonApiType = {
  slot: number;
  type: { name: string; url: string };
};
