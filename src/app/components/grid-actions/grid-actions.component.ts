import { Component, OnInit } from '@angular/core';
import {
  faPenToSquare,
  faTrashCan,
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { Subscription, withLatestFrom } from 'rxjs';
import { addSelectedExpenseToState } from 'src/app/expenses/data-state/actions/updates.action';
import { selectChosenExpense } from 'src/app/expenses/data-state/selectors/transactions.selectors';
import { ExpensesAppState } from 'src/app/expenses/data-state/states/expenses-app.state';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Expense } from 'src/app/shared/models/expense';

@Component({
  selector: 'app-grid-actions',
  templateUrl: './grid-actions.component.html',
  styleUrls: ['./grid-actions.component.scss'],
})
export class GridActionsComponent implements ICellRendererAngularComp {
  /**
   * Edit button icon.
   * @type {IconDefinition}
   */
  editButtonIcon: IconDefinition = faPenToSquare;

  /**
   * Edit button icon tooltip.
   * @type {string}
   */
  editButtonIconTooltip: string = 'Edit Record';

  /**
   * Delete button icon.
   * @type {IconDefinition}
   */
  deleteButtonIcon: IconDefinition = faTrashCan;

  /**
   * Delete button icon tooltip
   * @type {string}
   */
  deleteButtonIconTooltip: string = 'Delete Record';

  /**
   * Params
   * @type {ICellRendererParams<any, any>}
   */
  params: ICellRendererParams<any, any>;

  /**
   * Grid api
   * @type {GridApi}
   */
  gridAPI: GridApi;

  /**
   * Chosen expense
   * @type {Expense}
   */
  chosenExpense$ = this.expenseStore.select(selectChosenExpense);

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  subscriptions: Subscription[] = [];

  constructor(private expenseStore: Store<ExpensesAppState>) {}

  agInit(params: ICellRendererParams<any, any>): void {
    this.gridAPI = params.api;
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  updateDelete(action: string) {
    this.expenseStore.dispatch(
      addSelectedExpenseToState({ expense: this.params.data, action: action })
    );
  }
}
