import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { selectDailyTransactions } from '../data-state/selectors/transactions.selectors';
import { TransactionState } from '../data-state/states/transactions.state';
import { TransactionsService } from '../transaction.service';

@Component({
  templateUrl: './full-data-history.component.html',
  styleUrls: ['./full-data-history.component.scss'],
})
export class FullDataHistoryComponent implements OnInit {
  public pageTitle: string = 'Historic Data';
  public transactionData: DailyTransaction[] | undefined = [];
  public total: number | undefined = 0;
  public dropDownMenuItems: string[] = [];
  private subscriptions: Subscription[] = [];

  @Input()
  public filterGroup: FormGroup;

  constructor(
    private transactionService: TransactionsService,
    private transactionStore: Store<TransactionState>,
    formBuilder: FormBuilder
  ) {
    this.filterGroup = formBuilder.group({
      startDate: null,
      endDate: null,
      category: '',
    });
    this.dropDownMenuItems = ['Food', 'Transport', 'Social', 'Online', 'Other'];
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.transactionStore
        .select(selectDailyTransactions)
        .subscribe((results) => {
          this.transactionData = results?.transactions;
          this.total = results?.transactionTotal;
        })
    );
  }

  submit(_: Event): void {
    this.transactionService
      .getFilteredTransactions(
        this.filterGroup.value.startDate,
        this.filterGroup.value.endDate,
        this.filterGroup.value.category
      )
      .subscribe((results) => {
        this.transactionData = results.data.transactions;
        this.total = results.data.total;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
