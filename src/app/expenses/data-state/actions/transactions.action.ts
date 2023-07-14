import { createAction, props } from '@ngrx/store';
import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { Category } from 'src/app/shared/models/category';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { Expense } from 'src/app/shared/models/expense';
import { MonthlyInOut } from 'src/app/shared/models/monthly-ins-outs';
import { User } from 'src/app/shared/models/user';

const expensesPrefix = '[Expenses] - ';

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

export const loadCategories = createAction(`${expensesPrefix} Load Categories`);

export const loadCategoriesSuccess = createAction(
  `${expensesPrefix} Load Categories Success`,
  props<{ categories: Category[] }>()
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
