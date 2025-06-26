import {
  Component,
  effect,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.scss'],
  imports: [IonButton, IonIcon],
})
export class FavButtonComponent {
  protected readonly id = input<number | undefined>();
  protected readonly favoriteService = inject(FavoriteService);
  isFavorite: WritableSignal<boolean> = signal(false);

  constructor() {
    addIcons({ heart, heartOutline });

    effect(() => {
      const id = this.id();
      if (id === undefined) {
        return;
      }

      this.isFavorite.set(this.favoriteService.isFavorite(id));
    });
  }

  toogle() {
    const id = this.id();
    if (id === undefined) {
      return;
    }

    if (this.isFavorite()) {
      this.favoriteService.remove(id);
    } else {
      this.favoriteService.add(id);
    }

    this.isFavorite.set(this.favoriteService.isFavorite(id));
  }
}
