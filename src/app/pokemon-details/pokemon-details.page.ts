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
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Pokemon, PokemonEvolutionChain } from '../types/Pokemon';

import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

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
  ],
})
export class PokemonDetailsPage implements OnInit {
  search = inject(SearchService);
  pokemon: WritableSignal<Pokemon | null> = signal(null);
  evolutions: WritableSignal<PokemonEvolutionChain[]> = signal([]);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    addIcons({ arrowBack });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.search.searchPokemonByIdOrName(id).subscribe({
      next: (pokemon: Pokemon) => {
        this.pokemon.set(pokemon);

        this.search
          .getEvolutionChainInformations(pokemon.id)
          .then(evo => this.evolutions.set(evo));
      },
    });
  }

  redirectToHome() {
    this.router.navigate([`/`]);
  }
}
