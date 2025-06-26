import { Component } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  selector: 'app-to-favorites-page',
  templateUrl: './to-favorites-page.component.html',
  styleUrls: ['./to-favorites-page.component.scss'],
  imports: [IonButton, IonIcon],
})
export class ToFavoritesPageComponent {
  readonly FAVORITE_ROUTE = '/favorites';

  constructor() {
    addIcons({ heart });
  }
}
