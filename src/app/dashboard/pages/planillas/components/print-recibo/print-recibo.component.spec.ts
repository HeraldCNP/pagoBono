import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintReciboComponent } from './print-recibo.component';

describe('PrintReciboComponent', () => {
  let component: PrintReciboComponent;
  let fixture: ComponentFixture<PrintReciboComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintReciboComponent]
    });
    fixture = TestBed.createComponent(PrintReciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
