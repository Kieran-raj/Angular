import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  GridReadyEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import {
  selectHistoricTransactions,
  selectTotalAmount,
} from '../data-state/selectors/transactions.selectors';
import { TransactionState } from '../data-state/states/transactions.state';

@Component({
  selector: 'app-expenses-grid',
  templateUrl: './expenses-grid.component.html',
  styleUrls: ['./expenses-grid.component.scss'],
})
export class ExpensesGridComponent implements OnInit, OnDestroy {
  /**
   * Transactional data.
   * @type {Observable<DailyTransaction[]>}
   */
  public historicTransactions$: Observable<DailyTransaction[] | undefined>;

  /**
   * Total of all transactions.
   * @type {number}
   */
  public amountTotal: number;

  /**
   * Subscriptions.
   * @type {Subscription[]}
   */
  subscriptions: Subscription[];

  public columnDefs: ColDef[] = [
    {
      headerName: 'Amount (£)',
      field: 'amount',
      filter: 'agNumberColumnFilter',
      valueFormatter: this.amountValueFormatter,
    },
    {
      headerName: 'Category',
      field: 'category',
      filter: 'agTextColumnFilter',
      valueFormatter: this.categoryValueFormatter,
    },
    { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter' },
    { headerName: 'Description', field: 'description', sortable: false },
  ];

  public rowData$!: Observable<any[] | undefined>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.historicTransactions$;
    params.api.sizeColumnsToFit();
  }

  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  constructor(private transactionStore: Store<TransactionState>) {
    this.historicTransactions$ = this.transactionStore.select(
      selectHistoricTransactions
    );

    this.transactionStore.select(selectTotalAmount);
  }

  amountValueFormatter(params: ValueFormatterParams<number>) {
    return `£ ${params.value.toFixed(2)}`;
  }

  categoryValueFormatter(params: ValueFormatterParams<string>) {
    return params.value[0].toUpperCase() + params.value.substr(1).toLowerCase();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
