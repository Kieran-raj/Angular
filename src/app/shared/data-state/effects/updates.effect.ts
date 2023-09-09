import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import { UpdatesService } from '../../../expenses/api-services/updates.service';
import {
  loadExpenses,
  loadDailyExpenses,
  loadMonthlyInsAndOuts,
  loadCategoricalAmounts
} from '../actions/transactions.action';
import {
  addNewCategory,
  addNewCategorySuccess,
  createUpdateTransaction,
  createUpdateTransactionSuccess,
  deleteTransaction,
  deleteTransactionSuccess
} from '../actions/updates.action';
import { TransactionState } from '../states/transactions.state';
import { ExpensesAuthService } from '../../auth/expenses-auth.service';

@Injectable()
export class UpdatesEffect {
  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewCategory),
      mergeMap((action) => {
        const body = {
          name: action.category
        };
        return this.updateService
          .updateCategory(body)
          .pipe(map(() => addNewCategorySuccess({ isUpdated: true })));
      })
    )
  );

  // Needs to reload expenses data with user
  updateCreateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUpdateTransaction),
      mergeMap((action) => {
        const body = action.updates;

        return this.updateService.updateCreateTransaction(body).pipe(
          map(() => {
            this.transactionStore.dispatch(loadDailyExpenses());

            this.transactionStore.dispatch(
              loadExpenses({ user: this.authService.domainUser })
            );

            this.transactionStore.dispatch(loadMonthlyInsAndOuts());

            this.transactionStore.dispatch(loadCategoricalAmounts());

            return createUpdateTransactionSuccess({ isUpdated: true });
          })
        );
      })
    )
  );

  // Needs to reload expenses data with user
  deleteTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTransaction),
      mergeMap((action) => {
        return this.updateService.deleteTransaction(action.expense).pipe(
          map(() => {
            this.transactionStore.dispatch(loadCategoricalAmounts());
            this.transactionStore.dispatch(loadDailyExpenses());
            this.transactionStore.dispatch(
              loadExpenses({ user: this.authService.domainUser })
            );

            return deleteTransactionSuccess();
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private updateService: UpdatesService,
    private transactionStore: Store<TransactionState>,
    private authService: ExpensesAuthService
  ) {}
}
