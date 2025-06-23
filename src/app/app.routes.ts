import { Routes } from '@angular/router';
import { PokemonDetailsComponent } from './pokemons/pokemon-details/pokemon-details.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'pokemons/:id',
    component: PokemonDetailsComponent,
  },
];
