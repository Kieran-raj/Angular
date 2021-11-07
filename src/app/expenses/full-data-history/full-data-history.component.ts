import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transaction.service';

@Component({
  templateUrl: './full-data-history.component.html',
  styleUrls: ['./full-data-history.component.scss'],
})
export class FullDataHistoryComponent implements OnInit {
  pageTitle: string = 'Historic Data';
  transactionData: any = [];

  constructor(private transactionService: TransactionsService) {}

  ngOnInit(): void {
    this.transactionService.getAllTransactions().subscribe((results) => {
      this.transactionData = results.data;
    });
  }

  ngOnDestroy(): void {}
}
