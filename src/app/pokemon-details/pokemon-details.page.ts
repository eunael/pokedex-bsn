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
} from '@ionic/angular/standalone';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { Pokemon } from '../types/Pokemon';

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
  ],
})
export class PokemonDetailsPage implements OnInit {
  search = inject(SearchService);
  pokemon: WritableSignal<Pokemon | null> = signal(null);

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.search.searchPokemonByIdOrName(id).subscribe({
      next: (pokemon: Pokemon) => {
        this.pokemon.set(pokemon);
      },
    });
  }
}
