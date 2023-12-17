import { createAction, props } from '@ngrx/store';
import { CategoricalAmounts } from '@shared/models/categorical-amounts';
import { DailyAmount } from '@shared/models/daily-expense';
import { Expense } from '@shared/models/expense';
import { MonthlyInOut } from '@shared/models/monthly-ins-outs';
import { User } from '@shared/models/user';
import { UpcomingExpense } from '@shared/models/upcoming-expense';
import { HttpErrorResponse } from '@angular/common/http';

const expensesPrefix = '[Expenses Transactions] - ';

export const loadExpenses = createAction(
  `${expensesPrefix} Load Expenses`,
  props<{ user: User | null }>()
);

export const loadExpensesSuccess = createAction(
  `${expensesPrefix} Load Expenses Success`,
  props<{ expenses: Expense[] }>()
);

export const loadDailyExpenses = createAction(
  `${expensesPrefix} Load Daily Expenses`
);

export const loadDailyExpensesSuccess = createAction(
  `${expensesPrefix} Load Daily Expenses Success`,
  props<{ transactions: DailyAmount[] }>()
);

export const loadMonthlyInsAndOuts = createAction(
  `${expensesPrefix} Load Monthly Ins and Outs`
);

export const loadMonthlyInsAndOutsSuccess = createAction(
  `${expensesPrefix} Load Monthly Ins and Outs Success`,
  props<{ monthlyInsAndOuts: MonthlyInOut[] }>()
);

export const loadCategoricalAmounts = createAction(
  `${expensesPrefix} Load Categorical Amounts`
);

export const loadCategoricalAmountsSuccess = createAction(
  `${expensesPrefix} Load Categorical Amounts Success`,
  props<{ transactions: CategoricalAmounts[] }>()
);

export const addChosenExpenseToState = createAction(
  `${expensesPrefix} Add Selected Expense To State`,
  props<{ expense: Expense }>()
);

export const loadMonthlyBreakDown = createAction(
  `${expensesPrefix} Load Monthly Breakdown Amounts`,
  props<{ month: string; year: string }>()
);

export const loadMonthlyBreakDownSuccess = createAction(
  `${expensesPrefix} Load Monthly Breakdown Amounts Success`,
  props<{ amounts: CategoricalAmounts[] }>()
);

export const clearState = createAction(`${expensesPrefix}  Clearing State`);

export const loadUserUpcomingExpenses = createAction(
  `${expensesPrefix} Load User Upcoming Expenses`
);

export const loadUserUpcomingExpensesSuccess = createAction(
  `${expensesPrefix} Load User Upcoming Expenses Success`,
  props<{ expenses: UpcomingExpense[] }>()
);

export const loadUserUpcomingExpensesFailed = createAction(
  `${expensesPrefix} Load User Upcoming Expenses Failed`,
  props<{ error: HttpErrorResponse }>()
);
