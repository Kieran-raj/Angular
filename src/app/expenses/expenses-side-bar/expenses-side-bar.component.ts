import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
   * Whether or not to show the date selection.
   * @type {boolean}
   */
  @Input()
  public showDateSelection: boolean = true;

  /**
   * Label for the checkbox
   * @type {string}
   */
  @Input()
  public checkBoxLabel: string;

  /**
   * Reset button text.
   * @type {string}
   */
  @Input()
  public resetText = 'Reset Graph';

  /**
   * Event emmiter for dropdown menu.
   * @type {EventEmitter<string>}
   */
  @Output()
  public dropDownValue = new EventEmitter<string>();

  /**
   * Event for reset button.
   * @type  {EventEmitter<string>}
   */
  @Output()
  resetButton = new EventEmitter();

  /**
   * Event for toggling moving average.
   * @type {EventEmitter<boolean>}
   */
  @Output()
  toggleMovingAverage = new EventEmitter<boolean>();

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
   * Drop down values
   * @type {string[]}
   */
  public dropDownValues = ['Daily', 'Monthly'];

  /**
   * Initial drop down value
   * @type {string}
   */
  public initialDropDownValue = 'Daily';

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

  resetButtonClick(event: Event): void {
    this.resetButton.emit(event);
    this.initialDropDownValue = 'Daily';
    this.showMovingAverage = true;
    this.movingAverageToggled = false;
  }

  dropDownValueChange(value: string): void {
    this.initialDropDownValue = value;
    this.dropDownValue.emit(value);
    this.showMovingAverage = value === 'Daily' ? true : false;
  }

  movingAverageButtonClick(): void {
    this.movingAverageToggled = !this.movingAverageToggled;
    if (this.movingAverageToggled) {
      this.loadMovingAverageData();
    } else {
      this.toggleMovingAverage.emit(false);
    }
  }

  onWindowSizeChange(): void {
    const newWindow = this.formGroup.controls['movingAverageWindow'].value;
    if (newWindow && this.showMovingAverage) {
      this.toggleMovingAverage.emit(false);
      this.loadMovingAverageData(newWindow.toString());
    }
  }

  private loadMovingAverageData(window: string = '2'): void {
    this.transactionStore.dispatch(loadMovingAverage({ window: window }));
  }
}
