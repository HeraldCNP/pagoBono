import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPlanillaComponent } from './lista-planilla.component';

describe('ListaPlanillaComponent', () => {
  let component: ListaPlanillaComponent;
  let fixture: ComponentFixture<ListaPlanillaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPlanillaComponent]
    });
    fixture = TestBed.createComponent(ListaPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
