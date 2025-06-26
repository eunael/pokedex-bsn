import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SearchService } from '../../services/search.service';
import { SimplePokemon } from '../../interfaces/pokemons.interface';
import {
  IonCard,
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
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';

import { addIcons } from 'ionicons';
import { eye, heart } from 'ionicons/icons';
import { FavButtonComponent } from '../../components/fav-button/fav-button.component';
import { PokemonsPaginateApi } from 'src/app/interfaces/pokeapi.interface';
import { PokemonDisplayComponent } from '../../components/pokemon-display/pokemon-display.component';
import { ToFavoritesPageComponent } from '../../components/redirects-buttons/to-favorites-page/to-favorites-page.component';
import { ToSomewhereComponent } from '../../components/redirects-buttons/to-somewhere/to-somewhere.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonCard,
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
    PokemonDisplayComponent,
    ToFavoritesPageComponent,
    ToSomewhereComponent,
  ],
})
export class HomePage implements OnInit {
  protected readonly searchService = inject(SearchService);
  paginate: WritableSignal<PokemonsPaginateApi | null> = signal(null);
  pokemonList: WritableSignal<SimplePokemon[]> = signal([]);

  constructor() {
    addIcons({ eye, heart });
  }

  ngOnInit(): void {
    this.getNextPage();
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
}
