import { Component, Input } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-fav-button',
  templateUrl: './fav-button.component.html',
  styleUrls: ['./fav-button.component.scss'],
  imports: [IonButton, IonIcon],
})
export class FavButtonComponent {
  @Input() id?: string | number;
  private favKey = 'favorites';

  constructor() {
    addIcons({ heartOutline });
  }

  // async ngOnInit() {
  //   await this.storage.create()
  // }

  // async add() {
  //   await this.storage.set(this.favKey, this.id)
  // }
}
