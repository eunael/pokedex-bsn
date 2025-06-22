import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonContent,
  IonFooter
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonTitle, IonSearchbar, IonGrid, IonRow, IonCol, IonContent, IonFooter],
})
export class AppComponent {
  constructor() {}
}
