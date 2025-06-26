import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  protected favoriteIds = signal<number[]>([]);

  public readonly favoritePokemonIds = this.favoriteIds.asReadonly();
  protected readonly FAVORITES_KEY = 'pokemon_favorites';

  constructor() {
    this.loadFavorites();

    effect(() => {
      const favorites = this.favoriteIds();
      this.saveFavorites(favorites);
    });
  }

  protected loadFavorites() {
    const stored = localStorage.getItem(this.FAVORITES_KEY);
    if (stored) {
      const favorites = JSON.parse(stored) as number[];
      this.favoriteIds.set(favorites);
    }
  }

  protected saveFavorites(favorites: string | number[]) {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
  }

  add(pokemonId: number): void {
    this.favoriteIds.update(current => {
      if (!current.includes(pokemonId)) {
        return [...current, pokemonId];
      }
      return current;
    });
  }

  remove(pokemonId: number): void {
    this.favoriteIds.update(current => current.filter(id => id !== pokemonId));
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds().includes(id);
  }

  favoritesCount(): number {
    return this.favoriteIds().length;
  }
}
