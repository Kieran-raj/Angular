import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClickedEvent,
  ColDef,
  ColumnApi,
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
  ValueGetterParams
} from 'ag-grid-community';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { GridActionsComponent } from 'src/app/components/grid-actions/grid-actions.component';
import { Expense } from 'src/app/shared/models/expense';
import { addChosenExpenseToState } from '../../shared/data-state/actions/transactions.action';
import { selectExpenses } from '../../shared/data-state/selectors/transactions.selectors';
import { TransactionState } from '../../shared/data-state/states/transactions.state';

@Component({
  selector: 'app-expenses-grid',
  templateUrl: './expenses-grid.component.html',
  styleUrls: ['./expenses-grid.component.scss']
})
export class ExpensesGridComponent implements OnInit, OnDestroy {
  /**
   * Transactional data.
   * @type {Observable<Transaction[]>}
   */
  public expenses$: Observable<Expense[] | undefined | null>;

  public rowData$!: Observable<any[] | undefined | null>;

  /**
   * Subscriptions.
   * @type {Subscription[]}
   */
  subscriptions: Subscription[] = [];

  public columnDefs: ColDef[] = [
    {
      headerName: 'Amount',
      field: 'amount',
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: this.amountValueFormatter
    },
    {
      headerName: 'Category',
      field: 'category',
      filter: 'agTextColumnFilter',
      sortable: true,
      valueFormatter: this.categoryValueFormatter
    },
    {
      headerName: 'Date',
      field: 'date',
      filter: 'agDateColumnFilter',
      sortable: true,
      sort: 'desc',
      valueGetter: this.dataValueGetter
    },
    { headerName: 'Description', field: 'description', sortable: false },
    {
      headerName: 'Actions',
      headerClass: 'text-center',
      cellStyle: {
        textAlign: 'center'
      },
      field: '',
      sortable: false,
      maxWidth: 150,
      cellRenderer: GridActionsComponent
    }
  ];

  private mobileFields = ['description', 'amount', 'date'];

  private gridApi: GridApi;

  private columnApi: ColumnApi;

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private transactionStore: Store<TransactionState>) {
    this.expenses$ = this.transactionStore.select(selectExpenses);
  }

  ngOnInit(): void {
    if (window.innerWidth <= 500) {
      this.columnDefs = this.columnDefs.filter((cd) =>
        this.mobileFields.includes(cd.field ?? '')
      );
      this.columnDefs.forEach((cd) => (cd.cellStyle = { fontSize: '11px' }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.expenses$;
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
  }

  onCellClicked(e: CellClickedEvent): void {
    this.transactionStore.dispatch(
      addChosenExpenseToState({
        expense: e.node.data
      })
    );
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  amountValueFormatter(params: ValueFormatterParams<number>) {
    return `£ ${params.value.toFixed(2)}`;
  }

  categoryValueFormatter(params: ValueFormatterParams<string>) {
    return (
      params.value[0].toUpperCase() + params.value.substring(1).toLowerCase()
    );
  }

  dataValueGetter(params: ValueGetterParams<Expense>) {
    return params.data?.date.split('T')[0];
  }
}
