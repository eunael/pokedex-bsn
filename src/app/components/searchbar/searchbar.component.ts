import { Component, inject, OnInit } from '@angular/core';
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
import { ToSomewhereComponent } from '../redirects-buttons/to-somewhere/to-somewhere.component';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  imports: [
    IonSearchbar,
    IonList,
    IonItem,
    IonLabel,
    IonImg,
    IonAvatar,
    ToSomewhereComponent,
  ],
})
export class SearchbarComponent implements OnInit {
  protected readonly router = inject(Router);
  protected readonly searchService = inject(SearchService);
  urlPathBack = '/';
  pokemonFound?: Pokemon | null;

  constructor() {}

  ngOnInit(): void {
    this.urlPathBack = this.router.url;
  }

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
}
