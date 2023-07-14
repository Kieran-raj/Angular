import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { Expense } from 'src/app/shared/models/expense';
import { MonthlyInOut } from 'src/app/shared/models/monthly-ins-outs';
import { TransactionsService } from '../../api-services/transaction.service';

import {
  loadExpenses,
  loadDailyExpenses,
  loadDailyExpensesSuccess,
  loadExpensesSuccess,
  loadCategoricalAmounts,
  loadCategoricalAmountsSuccess,
  loadCategories,
  loadCategoriesSuccess,
  loadMonthlyInsAndOuts,
  loadMonthlyInsAndOutsSuccess,
  loadMonthlyBreakDown,
  loadMonthlyBreakDownSuccess,
} from '../actions/transactions.action';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable()
export class TransactionsEffect {
  loadExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadExpenses),
      mergeMap((action) => {
        if (action?.user) {
          return this.transactionService
            .getUserExpenses(action.user.id.toString())
            .pipe(
              map((expenses: Expense[]) => {
                return loadExpensesSuccess({
                  expenses: expenses,
                });
              })
            );
        }
        return this.transactionService.getAllExpenses().pipe(
          map((expenses: Expense[]) => {
            return loadExpensesSuccess({
              expenses: expenses,
            });
          })
        );
      })
    )
  );

  loadDailyExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDailyExpenses),
      mergeMap(() =>
        this.transactionService
          .getDailyAmounts(this.authService.user.id.toString())
          .pipe(
            map((dailyAmounts: DailyAmount[]) =>
              loadDailyExpensesSuccess({
                transactions: dailyAmounts,
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
        this.transactionService
          .getCategoricalAmounts(this.authService.user.id.toString())
          .pipe(
            map((categoricalAmounts: CategoricalAmounts[]) =>
              loadCategoricalAmountsSuccess({
                transactions: categoricalAmounts,
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

  loadMonthlyInsAndOuts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMonthlyInsAndOuts),
      mergeMap(() =>
        this.transactionService
          .getMonthlyInOuts(this.authService.user.id.toString())
          .pipe(
            map((data: MonthlyInOut[]) =>
              loadMonthlyInsAndOutsSuccess({
                monthlyInsAndOuts: data,
              })
            )
          )
      )
    )
  );

  loadMonthlyBreakdown$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMonthlyBreakDown),
      mergeMap((action) =>
        this.transactionService
          .getMonthBreakDown(action.month, action.year)
          .pipe(
            map((data: CategoricalAmounts[]) =>
              loadMonthlyBreakDownSuccess({
                amounts: data,
              })
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private transactionService: TransactionsService,
    private authService: AuthService
  ) {}
}
