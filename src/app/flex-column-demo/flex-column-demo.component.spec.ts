import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexColumnDemoComponent } from './flex-column-demo.component';

describe('FlexColumnDemoComponent', () => {
  let component: FlexColumnDemoComponent;
  let fixture: ComponentFixture<FlexColumnDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexColumnDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexColumnDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
