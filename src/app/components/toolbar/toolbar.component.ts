import { Component } from '@angular/core';
import {
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
} from '@ionic/angular/standalone';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { ToSomewhereComponent } from '../redirects-buttons/to-somewhere/to-somewhere.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [
    SearchbarComponent,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonHeader,
    ToSomewhereComponent,
  ],
})
export class ToolbarComponent {
  constructor() {}
}
