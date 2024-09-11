import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPlanillaComponent } from './check-planilla.component';

describe('CheckPlanillaComponent', () => {
  let component: CheckPlanillaComponent;
  let fixture: ComponentFixture<CheckPlanillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckPlanillaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckPlanillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
