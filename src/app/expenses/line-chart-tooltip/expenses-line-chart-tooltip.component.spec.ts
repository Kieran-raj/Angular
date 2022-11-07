import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesLineChartTooltipComponent } from './expenses-line-chart-tooltip.component';

describe('ExpensesLineChartTooltipComponent', () => {
  let component: ExpensesLineChartTooltipComponent;
  let fixture: ComponentFixture<ExpensesLineChartTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpensesLineChartTooltipComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesLineChartTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
