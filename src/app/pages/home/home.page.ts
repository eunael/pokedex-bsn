import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { PokemonsPaginateApi, SearchService } from '../../services/search.service';
import { Pokemon, SimplePokemon } from '../../types/Pokemon';
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
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonButton,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { Router } from '@angular/router';

import { addIcons } from 'ionicons';
import { eye, heart } from 'ionicons/icons';
import { FavButtonComponent } from '../../components/fav-button/fav-button.component';

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
    IonGrid,
    IonRow,
    IonCol,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    FavButtonComponent,
    IonButton,
  ],
})
export class HomePage implements OnInit {
  searchService = inject(SearchService);
  currentPokemon: WritableSignal<Pokemon | null> = signal(null);
  paginate: WritableSignal<PokemonsPaginateApi | null> = signal(null);
  pokemonList: WritableSignal<SimplePokemon[]> = signal([]);

  constructor(private router: Router) {
    addIcons({ eye, heart });

    this.getPokemon();

    setInterval(() => {
      this.getPokemon();
    }, 12000);
  }

  ngOnInit(): void {
    this.getNextPage();
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

  getNextPage(event?: InfiniteScrollCustomEvent) {
    const completeScroll = () => {
      const nexturl = this.paginate()?.next ?? null;
      if (nexturl === null) {
        setTimeout(() => {
          event?.target?.complete();
        }, 500);
        return;
      }

      const match = nexturl.match(/[?&]offset=(\d+|0).*[?&]limit=(\d+)/);
      if (match) {
        const limit = Number(match[2]);
        const offset = Number(match[1]) - limit;

        if (this.pokemonList().length !== offset + limit) {
          return;
        }

        setTimeout(() => {
          event?.target?.complete();
        }, 500);
      }
    };
    this.searchService.getPokemonsList(this.paginate()?.next).subscribe({
      next: async (pokemonPaginate: PokemonsPaginateApi) => {
        this.paginate.set(pokemonPaginate);
        const results: SimplePokemon[] = pokemonPaginate.results.map(
          (pokemon): SimplePokemon => {
            return { name: pokemon.name } as SimplePokemon;
          }
        );
        this.pokemonList.update(list => [...list, ...results]);

        completeScroll();

        results.forEach(async pokemon => {
          const name = pokemon.name;
          const pokemonData =
            await this.searchService.simpleSearchPokemon(name);

          this.pokemonList.update(list => {
            const index = list.findIndex(p => p.name === name);
            if (index === -1) {
              return list;
            }

            const copy = [...list];
            copy[index] = pokemonData;
            return copy;
          });
        });
      },
    });
  }

  redirectToFavorites() {
    this.router.navigate([`/favorites`]);
  }
}
