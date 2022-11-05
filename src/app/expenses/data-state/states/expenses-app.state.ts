import { TransactionState } from './transactions.state';
import { UpdateState } from './update.state';

export interface ExpensesAppState {
  transactions: TransactionState;
  updates: UpdateState;
}
