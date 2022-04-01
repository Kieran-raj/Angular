import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { Transactions } from 'src/app/shared/models/transactions';
import { TransactionsService } from '../transaction.service';

@Component({
  templateUrl: './full-data-history.component.html',
  styleUrls: ['./full-data-history.component.scss'],
})
export class FullDataHistoryComponent implements OnInit {
  pageTitle: string = 'Historic Data';
  transactionData: DailyTransaction[] | undefined = [];
  total: number | undefined = 0;
  dropDownMenuItems: string[] = [];

  @Input()
  public filterGroup: FormGroup;

  constructor(
    private transactionService: TransactionsService,
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
    this.transactionService.getAllTransactions().subscribe((results) => {
      this.transactionData = results.data.transactions;
      this.total = results.data.total;
    });
  }
  // TODO: Getting error when no data is being returned due to status code 204
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

  ngOnDestroy(): void {}
}
