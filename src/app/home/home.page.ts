import { Component, inject, signal, WritableSignal } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Pokemon } from '../types/Pokemon';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import { eye } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    ToolbarComponent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCardSubtitle,
    IonCardContent,
  ],
})
export class HomePage {
  searchService = inject(SearchService);
  currentPokemon: WritableSignal<Pokemon | null> = signal(null);

  constructor(private router: Router) {
    addIcons({ eye });

    this.getPokemon();

    setInterval(() => {
      this.getPokemon();
    }, 12000);
  }

  getPokemon() {
    const id = Math.floor(Math.random() * 1310 + 1);

    this.searchService.searchPokemonByIdOrName(id).subscribe({
      next: (pokemon: Pokemon) => {
        this.currentPokemon.set(pokemon);
      },
      error: error => {
        if (error.status === 404) {
          this.getPokemon();
        }
      },
    });
  }

  redirectToPokemonDetails() {
    this.router.navigate([`/pokemons/${this.currentPokemon()?.id}`]);
  }
}
