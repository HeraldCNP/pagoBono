import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiposDiscapacidadComponent } from './tipos-discapacidad.component';

describe('TiposDiscapacidadComponent', () => {
  let component: TiposDiscapacidadComponent;
  let fixture: ComponentFixture<TiposDiscapacidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TiposDiscapacidadComponent]
    });
    fixture = TestBed.createComponent(TiposDiscapacidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
