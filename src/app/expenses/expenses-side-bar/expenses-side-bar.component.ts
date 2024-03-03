import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { TransactionState } from '../../shared/data-state/states/transactions.state';

@Component({
  selector: 'app-expenses-side-bar',
  templateUrl: './expenses-side-bar.component.html',
  styleUrls: ['./expenses-side-bar.component.scss']
})
export class ExpensesSideBarComponent implements OnInit {
  /**
   * Event emit for chart period choice.
   */
  @Output()
  public chartPeriod = new EventEmitter<string>();

  /**
   * Plus icon
   * @type {IconDefinition}
   */
  public faPlus = faPlus;

  /**
   * Chart Period Choices
   * @type {string[]}
   */
  public periodChoices = ['Default', '1m', '6m', '1y', 'All'];

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

  constructor() {}

  ngOnInit(): void {}

  onChangePeriodChoice(period: string) {
    this.chartPeriodChoice = period;
    this.chartPeriod.emit(period);
  }
}
