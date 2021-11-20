import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionsService } from '../transaction.service';

@Component({
  templateUrl: './full-data-history.component.html',
  styleUrls: ['./full-data-history.component.scss'],
})
export class FullDataHistoryComponent implements OnInit {
  pageTitle: string = 'Historic Data';
  transactionData: any = [];
  total: number = 0;

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
  }

  ngOnInit(): void {
    this.transactionService.getAllTransactions().subscribe((results) => {
      this.transactionData = results.data.transactions;
      this.total = results.data.total;
    });
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

  ngOnDestroy(): void {}
}
