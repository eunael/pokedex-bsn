import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-somewhere',
  templateUrl: './to-somewhere.component.html',
  styleUrls: ['./to-somewhere.component.scss'],
  imports: [],
})
export class ToSomewhereComponent {
  protected readonly router = inject(Router);
  readonly urlPath = input<string | undefined>();
  readonly queryParams = input<object | undefined>();

  constructor() {}

  redirectTo() {
    const extras = this.queryParams()
      ? { queryParams: this.queryParams() }
      : {};
    this.router.navigate([this.urlPath()!], extras);
  }
}
