import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDisplayComponent } from './pokemon-display.component';

describe('PokemonDisplayComponent', () => {
  let component: PokemonDisplayComponent;
  let fixture: ComponentFixture<PokemonDisplayComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(PokemonDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
