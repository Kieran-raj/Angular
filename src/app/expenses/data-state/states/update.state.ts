import { Expense } from 'src/app/shared/models/expense';

export interface UpdateState {
  categoryUpdate: {
    newCategory: string | null;
    isUpdated: boolean | null;
  } | null;

  transactionCreateUpdate: {
    newTransaction: any | null;
    isUpdate: boolean | null;
  } | null;

  modifiedExpense: {
    chosenExpense: Expense | null;
    action: string | null;
  } | null;
}
