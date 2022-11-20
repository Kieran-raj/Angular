import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { Expense } from 'src/app/shared/models/expense';
import { MonthlyExpense } from 'src/app/shared/models/monthly-expense';
import { MovingAverageAmounts } from 'src/app/shared/models/moving-average-amounts';
import { TransactionsService } from '../../api-services/transaction.service';

import {
  loadAllExpenses,
  loadDailyExpenses,
  loadDailyExpensesSuccess,
  loadMonthlyExpense,
  loadMonthlyExpenseSuccess,
  loadAllExpensesSuccess,
  loadCategoricalAmounts,
  loadCategoricalAmountsSuccess,
  loadMovingAverage,
  loadMovingAverageSuccess,
  loadCategories,
  loadCategoriesSuccess,
} from '../actions/transactions.action';

@Injectable()
export class TransactionsEffect {
  loadAllExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllExpenses),
      mergeMap(() =>
        this.transactionService.getAllExpenses().pipe(
          map((expenses: Expense[]) => {
            return loadAllExpensesSuccess({
              expenses: expenses,
            });
          })
        )
      )
    )
  );

  loadDailyExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDailyExpenses),
      mergeMap(() =>
        this.transactionService.getDailyAmounts().pipe(
          map((dailyAmounts: DailyAmount[]) =>
            loadDailyExpensesSuccess({
              transactions: dailyAmounts,
            })
          )
        )
      )
    )
  );

  loadMonthlyExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMonthlyExpense),
      mergeMap(() =>
        this.transactionService.getMonthlyAmounts().pipe(
          map((monthlyAmounts: MonthlyExpense[]) =>
            loadMonthlyExpenseSuccess({
              monthlyTransactions: monthlyAmounts,
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
          map((categoricalAmounts: CategoricalAmounts[]) =>
            loadCategoricalAmountsSuccess({
              transactions: categoricalAmounts,
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
          map((movingAverage: MovingAverageAmounts[]) =>
            loadMovingAverageSuccess({
              movingAverage: movingAverage,
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
