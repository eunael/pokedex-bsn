import { Component, inject } from '@angular/core';
import {
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
} from '@ionic/angular/standalone';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { Router } from '@angular/router';

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
  ],
})
export class ToolbarComponent {
  protected readonly router = inject(Router);

  constructor() {}

  redirectToHome() {
    this.router.navigate([`/`]);
  }
}
