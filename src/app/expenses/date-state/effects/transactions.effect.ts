import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, exhaustMap, map, merge, mergeMap, of } from 'rxjs';
import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { Transactions } from 'src/app/shared/models/transactions';
import { TransactionsService } from '../../transaction.service';
import {
  loadDailyTransactions,
  loadDailyTransactionsSuccess,
} from '../actions/transactions.action';

@Injectable()
export class TransactionsEffect {
  loadTransactions2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDailyTransactions),
      mergeMap(() =>
        this.transactionService.getAllTransactions().pipe(
          map((transactionData: Transactions) =>
            loadDailyTransactionsSuccess({
              transactions: {
                transactionTotal: transactionData.data.total,
                transactions: transactionData.data.transactions,
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
