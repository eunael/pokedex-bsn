import { Component, inject } from '@angular/core';

import { IonSearchbar } from '@ionic/angular/standalone';
import { SearchService } from 'src/app/services/search.service';
import { Pokemon } from 'src/app/types/Pokemon';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  imports: [IonSearchbar],
})
export class SearchbarComponent {
  searchService = inject(SearchService);
  pokemonFound?: Pokemon;

  constructor() {}

  getPokemon(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const pokemonName = target.value;

    if (!pokemonName) {
      return;
    }

    this.searchService.searchPokemonByName(pokemonName).subscribe({
      next: (pokemon: Pokemon) => {
        this.pokemonFound = pokemon;
      },
      error: error => {
        alert('Erro: ' + error.message);
      },
    });
  }
}
