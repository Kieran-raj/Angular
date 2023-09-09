import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { Expense } from 'src/app/shared/models/expense';
import { MonthlyInOut } from 'src/app/shared/models/monthly-ins-outs';
import { TransactionsService } from '../../../expenses/api-services/transaction.service';

import {
  loadExpenses,
  loadDailyExpenses,
  loadDailyExpensesSuccess,
  loadExpensesSuccess,
  loadCategoricalAmounts,
  loadCategoricalAmountsSuccess,
  loadMonthlyInsAndOuts,
  loadMonthlyInsAndOutsSuccess,
  loadMonthlyBreakDown,
  loadMonthlyBreakDownSuccess
} from '../actions/transactions.action';
import { ExpensesAuthService } from '../../auth/expenses-auth.service';

@Injectable()
export class TransactionsEffect {
  loadExpenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadExpenses),
      mergeMap((action) => {
        if (action?.user) {
          return this.transactionService.getUserExpenses(action.user.id).pipe(
            map((expenses: Expense[]) => {
              return loadExpensesSuccess({
                expenses: expenses
              });
            })
          );
        }
        return this.transactionService.getAllExpenses().pipe(
          map((expenses: Expense[]) => {
            return loadExpensesSuccess({
              expenses: expenses
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
          .getDailyAmounts(this.expensesAuthService.domainUser.id)
          .pipe(
            map((dailyAmounts: DailyAmount[]) =>
              loadDailyExpensesSuccess({
                transactions: dailyAmounts
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
          .getCategoricalAmounts(this.expensesAuthService.domainUser.id)
          .pipe(
            map((categoricalAmounts: CategoricalAmounts[]) =>
              loadCategoricalAmountsSuccess({
                transactions: categoricalAmounts
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
          .getMonthlyInOuts(this.expensesAuthService.domainUser.id)
          .pipe(
            map((data: MonthlyInOut[]) =>
              loadMonthlyInsAndOutsSuccess({
                monthlyInsAndOuts: data
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
          .getMonthBreakDown(
            action.month,
            action.year,
            this.expensesAuthService.domainUser.id
          )
          .pipe(
            map((data: CategoricalAmounts[]) =>
              loadMonthlyBreakDownSuccess({
                amounts: data
              })
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private transactionService: TransactionsService,
    private expensesAuthService: ExpensesAuthService
  ) {}
}
