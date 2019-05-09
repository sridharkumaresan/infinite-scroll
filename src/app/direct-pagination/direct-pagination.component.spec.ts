import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectPaginationComponent } from './direct-pagination.component';

describe('DirectPaginationComponent', () => {
  let component: DirectPaginationComponent;
  let fixture: ComponentFixture<DirectPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
