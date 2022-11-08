import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesBarChartTooltipComponent } from './expenses-bar-chart-tooltip.component';

describe('ExpensesBarChartTooltipComponent', () => {
  let component: ExpensesBarChartTooltipComponent;
  let fixture: ComponentFixture<ExpensesBarChartTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesBarChartTooltipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesBarChartTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
