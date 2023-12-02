import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanillaComponent } from './form-planilla.component';

describe('FormPlanillaComponent', () => {
  let component: FormPlanillaComponent;
  let fixture: ComponentFixture<FormPlanillaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPlanillaComponent]
    });
    fixture = TestBed.createComponent(FormPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
