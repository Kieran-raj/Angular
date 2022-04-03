import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadDailyTransactions } from '../expenses/date-state/actions/transactions.action';
import { TransactionState } from '../expenses/date-state/states/transactions.state';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  pageTitle: string = 'Home';
  hideHomeLink: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
