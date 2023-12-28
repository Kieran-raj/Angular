import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUserUpcomingExpenses } from '@shared/data-state/actions/transactions.action';
import { selectUserUpcomingExpenses } from '@shared/data-state/selectors/transactions.selectors';
import { TransactionState } from '@shared/data-state/states/transactions.state';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { UpcomingExpense } from '@shared/models/upcoming-expense';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { UserState } from '@shared/data-state/states/user.state';
import { selectUserOptionState } from '@shared/data-state/selectors/user.selectors';
import { Subscription } from 'rxjs';
import { addUserOptionToState } from '@shared/data-state/actions/user.action';
import { ExpensesAuthService } from '@shared/auth/expenses-auth.service';

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
    private expensesAuthService: ExpensesAuthService,
    private userStore: Store<UserState>,
    private dialogService: MatDialog
  ) {
    this.subscriptions.push(
      this.expensesAuthService.user$.subscribe((user) => {
        if (user) {
          this.transactionStore.dispatch(loadUserUpcomingExpenses());
        }
      })
    );
  }

  ngOnInit(): void {}

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
