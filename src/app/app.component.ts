import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadDailyTransactions } from './expenses/date-state/actions/transactions.action';
import { TransactionState } from './expenses/date-state/states/transactions.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.transactionStore.dispatch(
      loadDailyTransactions({
        transactions: {
          transactionTotal: 0,
          transactions: [],
        },
      })
    );
  }
  constructor(private transactionStore: Store<TransactionState>) {}
}
