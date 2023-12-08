import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormApoderadoComponent } from './form-apoderado.component';

describe('FormApoderadoComponent', () => {
  let component: FormApoderadoComponent;
  let fixture: ComponentFixture<FormApoderadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormApoderadoComponent]
    });
    fixture = TestBed.createComponent(FormApoderadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
