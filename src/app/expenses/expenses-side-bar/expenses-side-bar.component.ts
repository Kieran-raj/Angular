import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
   */
  @Input()
  public resetText = 'Reset Graph';

  /**
   * Event emmiter for dropdown menu.
   */
  @Output()
  public dropDownValue = new EventEmitter();

  /**
   * Event for reset button.
   */
  @Output()
  resetButton = new EventEmitter();

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

  constructor() {}

  ngOnInit(): void {}

  resetButtonClick(event: Event): void {
    this.resetButton.emit(event);
    this.initialDropDownValue = 'Daily';
  }

  dropDownValueChange(value: string): void {
    this.initialDropDownValue = value;
    this.dropDownValue.emit(value);
  }
}
