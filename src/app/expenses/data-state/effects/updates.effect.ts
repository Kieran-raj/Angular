import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import { UpdatesService } from '../../api-services/updates.service';
import {
  loadAllExpenses,
  loadDailyExpenses,
  loadMonthlyExpense,
} from '../actions/transactions.action';
import {
  addNewCategory,
  addNewCategorySuccess,
  addNewTransaction,
  addNewTransactionSuccess,
} from '../actions/updates.action';
import { TransactionState } from '../states/transactions.state';

@Injectable()
export class UpdatesEffect {
  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewCategory),
      mergeMap((action) => {
        const body = {
          name: action.category,
        };
        return this.updateService
          .updateCategory(body)
          .pipe(map(() => addNewCategorySuccess({ isUpdated: true })));
      })
    )
  );

  updateCreateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addNewTransaction),
      mergeMap((action) => {
        const body = action.updates;

        return this.updateService.updateCreateTransaction(body).pipe(
          map(() => {
            this.transactionStore.dispatch(loadDailyExpenses());

            this.transactionStore.dispatch(loadMonthlyExpense());

            this.transactionStore.dispatch(loadAllExpenses());

            return addNewTransactionSuccess({ isUpdated: true });
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private updateService: UpdatesService,
    private transactionStore: Store<TransactionState>
  ) {}
}
