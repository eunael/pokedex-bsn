import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
} from '@ionic/angular/standalone';
import { FavButtonComponent } from '../../components/fav-button/fav-button.component';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { SimplePokemon } from '../../interfaces/pokemons.interface';
import { FavoriteService } from '../../services/favorite.service';
import { SearchService } from '../../services/search.service';
import { addIcons } from 'ionicons';
import { arrowBack, eye } from 'ionicons/icons';
import { ToSomewhereComponent } from '../../components/redirects-buttons/to-somewhere/to-somewhere.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    FavButtonComponent,
    ToolbarComponent,
    IonButton,
    ToSomewhereComponent,
  ],
})
export class FavoritesPage implements OnInit {
  protected readonly search = inject(SearchService);
  protected readonly storage = inject(FavoriteService);

  pokemonList: WritableSignal<SimplePokemon[]> = signal([]);

  protected readonly limit = 20;
  page = signal(0);
  totalPages = signal(0);

  constructor() {
    addIcons({ arrowBack, eye });

    effect(() => {
      this.totalPages.set(
        Math.ceil(this.storage.favoritesCount() / this.limit)
      );
    });
  }

  ngOnInit() {
    this.getNextPage();
  }

  getNextPage() {
    this.page.update(page => page + 1);

    const favoritesIds = this.storage.favoritePokemonIds();

    const favoritesIdsPage = favoritesIds.slice(
      (this.page() - 1) * this.limit,
      this.limit * this.page()
    );

    this.pokemonList.set(
      favoritesIdsPage.map(id => {
        return {
          id: id,
          name: '',
        } as SimplePokemon;
      })
    );

    this.pokemonList().forEach(async pokemon => {
      const id = pokemon.id!;
      const pokemonData = await this.search.simpleSearchPokemon(id);

      this.pokemonList.update(list => {
        const index = list.findIndex(p => p.id === id);
        if (index === -1) {
          return list;
        }

        const copy = [...list];
        copy[index] = pokemonData;
        return copy;
      });
    });
  }

  getPreviousPage() {
    this.page.update(page => page - 1);

    const favoritesIds = this.storage.favoritePokemonIds();

    const favoritesIdsPage = favoritesIds.slice(
      (this.page() - 1) * this.limit,
      this.limit * this.page()
    );

    this.pokemonList.set(
      favoritesIdsPage.map(id => {
        return {
          id: id,
          name: '',
        } as SimplePokemon;
      })
    );

    this.pokemonList().forEach(async pokemon => {
      const id = pokemon.id!;
      const pokemonData = await this.search.simpleSearchPokemon(id);

      this.pokemonList.update(list => {
        const index = list.findIndex(p => p.id === id);
        if (index === -1) {
          return list;
        }

        const copy = [...list];
        copy[index] = pokemonData;
        return copy;
      });
    });
  }
}
