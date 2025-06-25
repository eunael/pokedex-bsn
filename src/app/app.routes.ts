import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () =>
      import('./pokemon-details/pokemon-details.page').then(
        m => m.PokemonDetailsPage
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.page').then(m => m.FavoritesPage),
  },
];
