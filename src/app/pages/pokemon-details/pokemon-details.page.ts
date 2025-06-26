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
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import {
  Pokemon,
  PokemonEvolutionChain,
} from '../../interfaces/pokemons.interface';

import { addIcons } from 'ionicons';
import { arrowBack, arrowForward, eye } from 'ionicons/icons';
import { FavButtonComponent } from '../../components/fav-button/fav-button.component';
import { ToSomewhereComponent } from '../../components/redirects-buttons/to-somewhere/to-somewhere.component';

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
    ToSomewhereComponent,
  ],
})
export class PokemonDetailsPage implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  protected readonly search = inject(SearchService);
  urlPathBack: string = '/';
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

    this.route.queryParams.subscribe(route => {
      if (route['back']) {
        this.urlPathBack = route['back'];
      }
    });
  }
}
