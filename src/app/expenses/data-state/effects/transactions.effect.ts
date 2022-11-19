import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { MonthlyTransaction } from 'src/app/shared/models/monthly-transaction';
import { Transactions } from 'src/app/shared/models/transactions';
import { TransactionsService } from '../../api-services/transaction.service';

import {
  loadHistoricalTransactions,
  loadDailyTransactions,
  loadDailyTransactionsSuccess,
  loadMonthlyTransactions,
  loadMonthlyTransactionsSuccess,
  loadHistoricalTransactionsSucess,
  loadCategoricalAmounts,
  loadCategoricalAmountsSuccess,
  loadMovingAverage,
  loadMovingAverageSuccess,
  loadCategories,
  loadCategoriesSuccess,
} from '../actions/transactions.action';

@Injectable()
export class TransactionsEffect {
  loadHistoricalTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHistoricalTransactions),
      mergeMap(() =>
        this.transactionService.getHistoricalTransactions().pipe(
          map((transactionData: Transactions) => {
            return loadHistoricalTransactionsSucess({
              transactions: {
                total: transactionData.data.total,
                historicalTranscations: transactionData.data.transactions,
              },
            });
          })
        )
      )
    )
  );

  loadDailyTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDailyTransactions),
      mergeMap(() =>
        this.transactionService.getDailyAmounts().pipe(
          map((transactionData: DailyAmount[]) =>
            loadDailyTransactionsSuccess({
              transactions: transactionData,
            })
          )
        )
      )
    )
  );

  loadMonthlyTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMonthlyTransactions),
      mergeMap(() =>
        this.transactionService.getMonthlyAmounts().pipe(
          map((transactionData: MonthlyTransaction[]) =>
            loadMonthlyTransactionsSuccess({
              monthlyTransactions: transactionData,
            })
          )
        )
      )
    )
  );

  loadCategoricalAmounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategoricalAmounts),
      mergeMap(() =>
        this.transactionService.getCategoricalAmounts().pipe(
          map((transactionData: Transactions) =>
            loadCategoricalAmountsSuccess({
              transactions: {
                categoricalAmounts: transactionData.data.categoricalAmounts,
              },
            })
          )
        )
      )
    )
  );

  loadMovingAverageAmounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovingAverage),
      mergeMap((action) =>
        this.transactionService.getMovingAverage(action.window).pipe(
          map((transactionData: Transactions) =>
            loadMovingAverageSuccess({
              transactions: {
                movingAverageAmounts: transactionData.data.movingAverageAmounts,
              },
            })
          )
        )
      )
    )
  );

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      mergeMap(() =>
        this.transactionService.getCategories().pipe(
          map((categoryData: any) =>
            loadCategoriesSuccess({
              categories: categoryData,
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
