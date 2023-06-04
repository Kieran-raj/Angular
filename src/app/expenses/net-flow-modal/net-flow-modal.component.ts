import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faArrowTrendDown,
  faArrowTrendUp,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { PieData } from '../../shared/models/pie-data';

@Component({
  selector: 'app-net-flow-modal',
  templateUrl: './net-flow-modal.component.html',
  styleUrls: ['./net-flow-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NetFlowModalComponent implements OnInit {
  /**
   * Breakdown for a given month and year
   * @type {CategoricalAmounts[] | null}
   */
  @Input()
  public monthlyBreakdownData: CategoricalAmounts[] | null;

  /**
   * Is loading
   * @type {BehaviorSubject<boolean>}
   */
  public isLoading$ = new BehaviorSubject<boolean>(true);

  /**
   * Title
   * @type {string}
   */
  public title: string;

  /**
   * In Amount
   * @type {number}
   */
  public inAmount: number;

  /**
   * Out Amount
   * @type {number}
   */
  public outAmount: number;

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  public subscriptions: Subscription[] = [];

  /**
   * Pie chart options
   */
  public pieChartSize = [300, 300];

  /**
   * Arrow down icon
   */
  public arrowDownIcon = faArrowTrendDown;

  /**
   * Arrow down icon
   */
  public arrowUpIcon = faArrowTrendUp;

  constructor(
    private dialogInstance: MatDialogRef<NetFlowModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.title = data.title;
    this.inAmount = data.inAmount;
    this.outAmount = data.outAmount;
    this.monthlyBreakdownData = data.monthlyBreakdown;
  }

  ngOnInit(): void {
    if (this.monthlyBreakdownData !== null) {
      this.isLoading$.next(!this.isLoading$.value);
    }
  }

  ngOnDestroy(): void {}

  public formatePieData(data: CategoricalAmounts[] | null): PieData[] {
    if (data != null) {
      return data.map((catAmount) => ({
        name: catAmount.category,
        value: catAmount.amount,
        pctOfTotal: catAmount.percentage,
      }));
    }
    return [];
  }

  public onClose() {
    this.dialogInstance.close();
  }
}
