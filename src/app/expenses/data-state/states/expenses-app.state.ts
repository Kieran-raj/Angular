import { TransactionState } from './transactions.state';
import { UpdateState } from './update.state';
import { UserState } from './user.state';

export interface ExpensesAppState {
  transactions: TransactionState;
  updates: UpdateState;
  user: UserState;
}
