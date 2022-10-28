import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { Transactions } from 'src/app/shared/models/transactions';
import { TransactionsService } from '../../api-services/transaction.service';

import {
  loadDailyTransactions,
  loadDailyTransactionsSuccess,
  loadMonthlyTransactions,
  loadMonthlyTransactionsSuccess,
} from '../actions/transactions.action';

@Injectable()
export class TransactionsEffect {
  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDailyTransactions),
      mergeMap(() =>
        this.transactionService.getAmountsOnly().pipe(
          map((transactionData: Transactions) => {
            return loadDailyTransactionsSuccess({
              transactions: {
                dailyTransactions: transactionData.data.transactions,
              },
            });
          })
        )
      )
    )
  );

  loadMonthlyTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMonthlyTransactions),
      mergeMap(() =>
        this.transactionService.getMonthlyAmounts().pipe(
          map((transactionData: Transactions) =>
            loadMonthlyTransactionsSuccess({
              transactions: {
                monthlyTransactions: transactionData.data.monthlyTransactions,
              },
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private transactionService: TransactionsService
  ) {}
}
