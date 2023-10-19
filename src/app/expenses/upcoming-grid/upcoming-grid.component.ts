import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUserUpcomingExpenses } from 'src/app/shared/data-state/actions/transactions.action';
import { selectUserUpcomingExpenses } from 'src/app/shared/data-state/selectors/transactions.selectors';
import { TransactionState } from 'src/app/shared/data-state/states/transactions.state';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { UpcomingExpense } from 'src/app/shared/models/upcoming-expense';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import { DeleteModalComponent } from './create-delete-modal/delete-modal.component';
import { UserState } from 'src/app/shared/data-state/states/user.state';
import { selectUserOptionState } from 'src/app/shared/data-state/selectors/user.selectors';
import { Observable, Subscription } from 'rxjs';
import { UserOptionState } from 'src/app/shared/data-state/states/user/user-option.state';
import { addUserOptionToState } from 'src/app/shared/data-state/actions/user.action';

@Component({
  selector: 'app-upcoming-grid',
  templateUrl: './upcoming-grid.component.html',
  styleUrls: ['./upcoming-grid.component.scss']
})
export class UpcomingGridComponent implements OnInit, OnDestroy {
  /**
   * Delete button icon.
   * @type {IconDefinition}
   */
  public deleteButtonIcon = faTrashCan;

  /**
   * Delete button icon tooltip
   * @type {string}
   */
  public deleteButtonIconTooltip: string = 'Delete';

  /**
   * Upcoming expenses
   * @type {Observable<UpcomingExpense[]>}
   */
  public upcomingExpenses$ = this.transactionStore.select(
    selectUserUpcomingExpenses
  );

  /**
   * User option state
   * @type {Observable<UserOptionState>}
   */
  public userOptionState$ = this.userStore.select(selectUserOptionState);

  private dialogInstance: MatDialogRef<DeleteModalComponent, any>;

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  private subscriptions: Subscription[] = [];

  constructor(
    private transactionStore: Store<TransactionState>,
    private userStore: Store<UserState>,
    private dialogService: MatDialog
  ) {
    this.transactionStore.dispatch(loadUserUpcomingExpenses());
  }

  ngOnInit(): void {
    this.dialogInstance?.afterClosed().subscribe((data) => {
      console.log(data);
      this.transactionStore.dispatch(loadUserUpcomingExpenses());
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public deleteItem(item: UpcomingExpense) {
    this.userStore.dispatch(
      addUserOptionToState({ userOptionId: item.id, action: 'delete' })
    );
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      rowId: item.id
    };

    this.dialogInstance = this.dialogService.open(
      DeleteModalComponent,
      dialogConfig
    );
  }
}
