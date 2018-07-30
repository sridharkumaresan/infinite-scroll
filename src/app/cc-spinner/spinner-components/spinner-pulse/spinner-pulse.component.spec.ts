import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerPulseComponent } from './spinner-pulse.component';

describe('SpinnerPulseComponent', () => {
  let component: SpinnerPulseComponent;
  let fixture: ComponentFixture<SpinnerPulseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerPulseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerPulseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
