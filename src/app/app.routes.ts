import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () =>
      import('./pages/pokemon-details/pokemon-details.page').then(
        m => m.PokemonDetailsPage
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.page').then(m => m.FavoritesPage),
  },
];
