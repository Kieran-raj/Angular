import { CategoryState } from './category.state';
import { TransactionState } from './transactions.state';
import { UpdateState } from './update.state';
import { UserState } from './user.state';

export interface ExpensesAppState {
  transactions: TransactionState;
  category: CategoryState;
  updates: UpdateState;
  user: UserState;
}
