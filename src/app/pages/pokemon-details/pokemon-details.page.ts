import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import {
  Pokemon,
  PokemonEvolutionChain,
} from '../../interfaces/pokemons.interface';

import { addIcons } from 'ionicons';
import { arrowBack, arrowForward, eye } from 'ionicons/icons';
import { FavButtonComponent } from '../../components/fav-button/fav-button.component';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    ToolbarComponent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonCardSubtitle,
    CommonModule,
    IonButton,
    IonIcon,
    FavButtonComponent,
    IonFab,
    IonFabButton,
  ],
})
export class PokemonDetailsPage implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly search = inject(SearchService);
  pokemon: WritableSignal<Pokemon | null> = signal(null);
  evolutions: WritableSignal<PokemonEvolutionChain[]> = signal([]);

  constructor() {
    addIcons({ arrowBack, arrowForward, eye });
  }

  ngOnInit(): void {
    const id: string | number = this.route.snapshot.paramMap.get('id') ?? '';

    this.search.searchPokemonByIdOrName(id).subscribe({
      next: (pokemon: Pokemon) => {
        this.pokemon.set(pokemon);

        this.search
          .getEvolutionChainInformations(pokemon.id)
          .then(evo => this.evolutions.set(evo));
      },
    });
  }

  redirectToBack() {
    let routeToBack = '/';

    this.route.queryParams.subscribe(route => {
      if (route['back']) {
        routeToBack = route['back'];
      }
    });

    this.router.navigate([routeToBack]);
  }

  redirectToPokemonDetails(id?: number | string) {
    this.router.navigate([`/pokemons/${id}`]);
  }

  redirectToPokemonDetailsEvos(id?: number | string) {
    this.router.navigate([`/pokemons/${id}`], {
      queryParams: { back: `pokemons/${this.pokemon()!.id}` },
    });
  }
}
