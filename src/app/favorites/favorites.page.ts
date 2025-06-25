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
import { FavButtonComponent } from '../components/fav-button/fav-button.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { Router } from '@angular/router';
import { SimplePokemon } from '../types/Pokemon';
import { FavoriteService } from '../services/favorite.service';
import { SearchService } from '../services/search.service';
import { addIcons } from 'ionicons';
import { arrowBack, eye } from 'ionicons/icons';

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
  ],
})
export class FavoritesPage implements OnInit {
  search = inject(SearchService);
  storage = inject(FavoriteService);
  pokemonList: WritableSignal<SimplePokemon[]> = signal([]);

  private readonly limit = 20;
  public page = signal(0);
  public totalPages = signal(0);

  constructor(private router: Router) {
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

  redirectToPokemonDetails(id?: number | string) {
    this.router.navigate([`/pokemons/${id}`], {
      queryParams: { back: 'favorites' },
    });
  }

  redirectToHome() {
    this.router.navigate([`/`]);
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
