import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  IonCard,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { FavButtonComponent } from '../fav-button/fav-button.component';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemons.interface';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-pokemon-display',
  templateUrl: './pokemon-display.component.html',
  styleUrls: ['./pokemon-display.component.scss'],
  imports: [
    IonCard,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    FavButtonComponent,
  ],
})
export class PokemonDisplayComponent implements OnInit {
  protected readonly router = inject(Router);
  protected readonly searchService = inject(SearchService);
  currentPokemon: WritableSignal<Pokemon | null> = signal(null);

  constructor() {}

  ngOnInit() {
    this.getPokemon();

    setInterval(() => this.getPokemon(), 12000);
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

  redirectToPokemonDetails(id?: number | string) {
    this.router.navigate([`/pokemons/${id ?? this.currentPokemon()?.id}`]);
  }
}
