import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private readonly FAVORITES_KEY = 'pokemon_favorites';

  public favoritePokemonIds = signal<number[]>([]);

  constructor() {
    this.loadFavorites();

    effect(() => {
      const favorites = this.favoritePokemonIds();
      this.saveFavorites(favorites);
    });
  }

  private loadFavorites() {
    const stored = localStorage.getItem(this.FAVORITES_KEY);
    if (stored) {
      const favorites = JSON.parse(stored) as number[];
      this.favoritePokemonIds.set(favorites);
    }
  }

  private saveFavorites(favorites: string | number[]) {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }

  add(pokemonId: number): void {
    this.favoritePokemonIds.update(current => {
      if (!current.includes(pokemonId)) {
        return [...current, pokemonId];
      }
      return current;
    });
  }

  remove(pokemonId: number): void {
    this.favoritePokemonIds.update(current =>
      current.filter(id => id !== pokemonId)
    );
  }

  isFavorite(id: number): boolean {
    return this.favoritePokemonIds().includes(id);
  }
}
