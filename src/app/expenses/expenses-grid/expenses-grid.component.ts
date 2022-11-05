import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  GridReadyEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import { Observable, Subscription } from 'rxjs';
import { GridActionsComponent } from 'src/app/components/grid-actions/grid-actions.component';
import { DailyTransaction } from 'src/app/shared/models/daily-transaction';
import { addChosenExpenseToState } from '../data-state/actions/transactions.action';
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
      sortable: true,
      valueFormatter: this.amountValueFormatter,
    },
    {
      headerName: 'Category',
      field: 'category',
      filter: 'agTextColumnFilter',
      sortable: true,
      valueFormatter: this.categoryValueFormatter,
    },
    {
      headerName: 'Date',
      field: 'date',
      filter: 'agDateColumnFilter',
      sortable: true,
    },
    { headerName: 'Description', field: 'description', sortable: false },
    {
      headerName: 'Actions',
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'center',
      },
      field: '',
      sortable: false,
      maxWidth: 150,
      cellRenderer: GridActionsComponent,
    },
  ];

  public rowData$!: Observable<any[] | undefined>;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.historicTransactions$;
    params.api.sizeColumnsToFit();
  }

  onCellClicked(e: CellClickedEvent): void {
    this.transactionStore.dispatch(
      addChosenExpenseToState({
        expense: e.node.data,
      })
    );
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  constructor(private transactionStore: Store<TransactionState>) {
    this.historicTransactions$ = this.transactionStore.select(
      selectHistoricTransactions
    );

    this.transactionStore.select(selectTotalAmount).subscribe((data) => {
      if (data) {
        this.amountTotal = data;
      }
    });
  }

  amountValueFormatter(params: ValueFormatterParams<number>) {
    return `£ ${params.value.toFixed(2)}`;
  }

  categoryValueFormatter(params: ValueFormatterParams<string>) {
    return (
      params.value[0].toUpperCase() + params.value.substring(1).toLowerCase()
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
