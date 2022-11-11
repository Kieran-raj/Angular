import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
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
              categories: categoryData['categories'],
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
