import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonImg,
  IonAvatar,
} from '@ionic/angular/standalone';
import { SearchService } from 'src/app/services/search.service';
import { Pokemon } from '../../interfaces/pokemons.interface';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  imports: [IonSearchbar, IonList, IonItem, IonLabel, IonImg, IonAvatar],
})
export class SearchbarComponent {
  searchService = inject(SearchService);
  pokemonFound?: Pokemon | null;

  constructor(private router: Router) {}

  getPokemon(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const pokemonName = target.value;

    if (!pokemonName) {
      this.pokemonFound = null;
      return;
    }

    this.searchService.searchPokemonByIdOrName(pokemonName).subscribe({
      next: (pokemon: Pokemon) => {
        this.pokemonFound = pokemon;
      },
      error: error => {
        this.pokemonFound = null;
        console.error('Erro: ' + error.message);
      },
    });
  }

  setPokemonFoundNull() {
    this.pokemonFound = null;
  }

  redirectToPokemonDetails() {
    if (!this.pokemonFound) {
      return;
    }

    this.router.navigate([`/pokemons/${this.pokemonFound.id}`]);
    this.pokemonFound = null;
  }
}
