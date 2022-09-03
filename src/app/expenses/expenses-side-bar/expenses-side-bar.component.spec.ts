import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesSideBarComponent } from './expenses-side-bar.component';

describe('ExpensesSideBarComponent', () => {
  let component: ExpensesSideBarComponent;
  let fixture: ComponentFixture<ExpensesSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
