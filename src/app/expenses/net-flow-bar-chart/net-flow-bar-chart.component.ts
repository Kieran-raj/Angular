import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MonthlyInOut } from 'src/app/shared/models/monthly-ins-outs';
import { selectMonthlyInsAndOuts } from '../data-state/selectors/transactions.selectors';
import { TransactionState } from '../data-state/states/transactions.state';

@Component({
  selector: 'app-net-flow-bar-chart',
  templateUrl: './net-flow-bar-chart.component.html',
  styleUrls: ['./net-flow-bar-chart.component.scss'],
})
export class NetFlowBarChartComponent implements OnInit {
  /**
   * Monthly ins and outs
   * @type {Observable<MonthlyInOut[] | null>}
   */
  public monthlyInAndOuts$ = this.transactionStore.select(
    selectMonthlyInsAndOuts
  );

  /**
   * Source data
   * @type {MonthlyInOut[] | null | undefined}
   */
  public sourceData: MonthlyInOut[] | null | undefined;

  public colors = (value: string) => {
    switch (value) {
      case 'In': {
        return '#329932';
      }
      case 'Out': {
        return '#CC0000';
      }
    }
    return '#F9F3E6';
  };

  constructor(private transactionStore: Store<TransactionState>) {}

  ngOnInit(): void {
    this.monthlyInAndOuts$.subscribe((data) => {
      this.sourceData = data?.slice(Math.max(data.length - 6, 0));
    });
  }
}
