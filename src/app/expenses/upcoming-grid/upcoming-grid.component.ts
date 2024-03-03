import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
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
export class UpcomingGridComponent implements OnInit, OnDestroy, OnChanges {
  /**
   * Is selecting transactions
   * @type {boolean}
   */
  @Input()
  public isSelectingTransactions = false;

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

  /**
   * Selected transactions
   * @type {Set<UpcomingExpense>}
   */
  public selectedItems: Set<UpcomingExpense> = new Set();

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

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['isSelectingTransactions'].currentValue) {
      this.selectedItems = new Set<UpcomingExpense>();
    }
  }

  public delete() {
    const optionsIds: string[] = [];

    this.selectedItems.forEach((s) => optionsIds.push(s.id));
    this.userStore.dispatch(
      addUserOptionToState({
        userOptionIds: optionsIds,
        action: 'delete'
      })
    );

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      rowIds: optionsIds
    };

    this.dialogInstance = this.dialogService.open(
      DeleteModalComponent,
      dialogConfig
    );
  }

  public selectItem(item: UpcomingExpense) {
    if (this.selectedItems.has(item)) {
      this.selectedItems.delete(item);
    } else {
      this.selectedItems.add(item);
    }
  }

  public getDaysNextTransaction(date: string) {
    const itemDate = new Date(date).getTime();

    const currentDate = new Date().getTime();

    const difference = Math.abs(currentDate - itemDate);

    return Math.floor(difference / (1000 * 60 * 60 * 24));
  }
}
