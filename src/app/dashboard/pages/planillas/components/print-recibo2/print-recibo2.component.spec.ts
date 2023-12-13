import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintRecibo2Component } from './print-recibo2.component';

describe('PrintRecibo2Component', () => {
  let component: PrintRecibo2Component;
  let fixture: ComponentFixture<PrintRecibo2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrintRecibo2Component]
    });
    fixture = TestBed.createComponent(PrintRecibo2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
