import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcSpinnerComponent } from './cc-spinner.component';

describe('CcSpinnerComponent', () => {
  let component: CcSpinnerComponent;
  let fixture: ComponentFixture<CcSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
