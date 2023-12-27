import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingGridComponent } from './upcoming-grid.component';

describe('UpcomingGridComponent', () => {
  let component: UpcomingGridComponent;
  let fixture: ComponentFixture<UpcomingGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpcomingGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
