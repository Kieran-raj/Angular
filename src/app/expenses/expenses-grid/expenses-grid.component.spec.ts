import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesGridComponent } from './expenses-grid.component';

describe('ExpensesGridComponent', () => {
  let component: ExpensesGridComponent;
  let fixture: ComponentFixture<ExpensesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
