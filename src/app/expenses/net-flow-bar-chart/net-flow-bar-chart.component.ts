import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { MonthlyInOut } from 'src/app/shared/models/monthly-ins-outs';
import { loadMonthlyBreakDown } from '../../shared/data-state/actions/transactions.action';
import {
  selectInsAndOutsSeriesData,
  selectMonthlyBreakdown,
  selectMonthlyInsAndOuts
} from '../../shared/data-state/selectors/transactions.selectors';
import { TransactionState } from '../../shared/data-state/states/transactions.state';
import { NetFlowModalComponent } from '../net-flow-modal/net-flow-modal.component';

@Component({
  selector: 'app-net-flow-bar-chart',
  templateUrl: './net-flow-bar-chart.component.html',
  styleUrls: ['./net-flow-bar-chart.component.scss']
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

  /**
   * Info icon
   * @type {IconDefinition}
   */
  public infoIcon = faInfoCircle;

  private dialogInstance: MatDialogRef<NetFlowModalComponent> | null;

  private monthlyBreakdownData: CategoricalAmounts[] | null;

  /**
   * Subscription
   * @type {Subscription[]}
   */
  private subscriptions: Subscription[] = [];

  @ViewChild('modal', { static: true })
  modal: ElementRef;

  monthlyMap: { [key: string]: string } = {
    Jan: '1',
    Feb: '2',
    Mar: '3',
    Apr: '4',
    May: '5',
    Jun: '6',
    Jul: '7',
    Aug: '8',
    Sep: '9',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  };

  constructor(
    private transactionStore: Store<TransactionState>,
    public dialogService: MatDialog
  ) {}

  ngOnInit(): void {
    this.monthlyInAndOuts$.subscribe((data) => {
      this.sourceData = data?.slice(Math.max(data.length - 6, 0));
    });
  }

  public onSelection($event: any) {
    const series = $event?.series;
    const year = series.split('-')[1];
    const month = series.split('-')[0];
    const dialogConfig = new MatDialogConfig();

    this.transactionStore.dispatch(
      loadMonthlyBreakDown({
        month: this.monthlyMap[month],
        year: year
      })
    );

    this.subscriptions.push(
      combineLatest([
        this.transactionStore.select(selectInsAndOutsSeriesData(series)),
        this.transactionStore.select(selectMonthlyBreakdown)
      ]).subscribe(([seriesData, monthlyBreakdownData]) => {
        this.monthlyBreakdownData = monthlyBreakdownData;
        dialogConfig.data = {
          inAmount: seriesData?.find((s) => s.name === 'In')?.value,
          outAmount: seriesData?.find((s) => s.name === 'Out')?.value,
          title: this.generateTitle(year, month)
        };

        /**
         * This check doesn't quite feel right
         */
        if (this.dialogInstance && this.dialogInstance.componentInstance) {
          this.dialogInstance.componentInstance.monthlyBreakdownData =
            this.monthlyBreakdownData;
        }
      })
    );

    dialogConfig.disableClose = false;
    // dialogConfig.height = '100%';
    // dialogConfig.width = '100%';

    this.dialogInstance = this.dialogService.open(
      NetFlowModalComponent,
      dialogConfig
    );

    this.dialogInstance
      ?.afterClosed()
      .subscribe(() => {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
      })
      .unsubscribe();
  }

  private generateTitle(year: string, month: string): string {
    return `${month}-${year}`;
  }
}
