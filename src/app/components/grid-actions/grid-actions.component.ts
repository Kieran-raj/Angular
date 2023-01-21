import { Component } from '@angular/core';
import {
  faPenToSquare,
  faTrashCan,
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, ICellRendererParams } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { addModalAction } from 'src/app/expenses/data-state/actions/updates.action';
import { selectChosenExpense } from 'src/app/expenses/data-state/selectors/transactions.selectors';
import { UpdateState } from 'src/app/expenses/data-state/states/update.state';

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
  chosenExpense$ = this.updateStore.select(selectChosenExpense);

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  subscriptions: Subscription[] = [];

  constructor(private updateStore: Store<UpdateState>) {}

  agInit(params: ICellRendererParams<any, any>): void {
    this.gridAPI = params.api;
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  updateDelete(action: string) {
    this.updateStore.dispatch(addModalAction({ action: action }));
  }
}
