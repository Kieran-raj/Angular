import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { loadMovingAverage } from '../data-state/actions/transactions.action';
import { TransactionState } from '../data-state/states/transactions.state';

@Component({
  selector: 'app-expenses-side-bar',
  templateUrl: './expenses-side-bar.component.html',
  styleUrls: ['./expenses-side-bar.component.scss'],
})
export class ExpensesSideBarComponent implements OnInit {
  /**
   * Event emit for chart period choice.
   */
  @Output()
  public chartPeriod = new EventEmitter<string>();

  /**
   * Event for toggling moving average.
   * @type {EventEmitter<boolean>}
   */
  @Output()
  toggleMovingAverage = new EventEmitter<boolean>();

  /**
   * Plus icon
   * @type {IconDefinition}
   */
  public faPlus = faPlus;

  /**
   * Chart Period Choices
   * @type {string[]}
   */
  public periodChoices = ['Default', '1m', '6m', '1y'];

  /**
   * Period choice
   * @type {string}
   */
  public chartPeriodChoice = 'Default';

  /**
   * Flag to keep track of the toggle value.
   * @type {boolean}
   */
  public isToggled = false;

  /**
   * The toggle label.
   * @type {string}
   */
  public toggleLabel = 'Display moving average';

  /**
   * Date labels
   * @type {string[]}
   */
  public dateLabels: ['Start Date', 'End Date'];

  /**
   * Moving Average toggled
   * @type {boolean}
   */
  public movingAverageToggled = false;

  /**
   * Form Group
   * @type {FormGroup}
   */
  formGroup = new FormGroup({
    movingAverageWindow: new FormControl('2'),
  });

  /**
   * Show the moving average button
   * @type {boolean}
   */
  public showMovingAverage = true;

  constructor(private transactionStore: Store<TransactionState>) {}

  ngOnInit(): void {}

  // movingAverageButtonClick(): void {
  //   this.movingAverageToggled = !this.movingAverageToggled;
  //   if (this.movingAverageToggled) {
  //     this.loadMovingAverageData();
  //   } else {
  //     this.toggleMovingAverage.emit(false);
  //   }
  // }

  onWindowSizeChange(): void {
    const newWindow = this.formGroup.controls['movingAverageWindow'].value;
    if (newWindow && this.showMovingAverage) {
      this.toggleMovingAverage.emit(false);
      this.loadMovingAverageData(newWindow.toString());
    }
  }

  onChangePeriodChoice(period: string) {
    this.chartPeriodChoice = period;
    this.chartPeriod.emit(period);
  }

  private loadMovingAverageData(window: string = '2'): void {
    this.transactionStore.dispatch(loadMovingAverage({ window: window }));
  }
}
