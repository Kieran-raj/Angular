import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  clearAddUpdateUserOptionsState,
  deleteUserOption
} from '@shared/data-state/actions/user.action';
import { selectUserOptionState } from '@shared/data-state/selectors/user.selectors';
import { UserState } from '@shared/data-state/states/user.state';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteModalComponent implements OnInit, OnDestroy {
  /**
   * Warning triangle
   * @type {IconDefinition}
   */
  public faInfoTriangle = faTriangleExclamation;

  /**
   * Is is processing change.
   * @type {boolean}
   */
  public isProcessing: boolean | null;

  /**
   * Is change complete
   * @type {boolean}
   */
  public isComplete: boolean | null;

  /**
   * User option state
   * @type {Observable<UserOptionState>}
   */
  public userOptionState$ = this.userStore.select(selectUserOptionState);

  /**
   * Display message
   * @type {string}
   */
  public message =
    'Are you sure you want to delete this recurring expense? This <b>cannot</b> be recovered.';

  public error: {
    message: string | null;
    statusCode: number | null;
  } | null;

  /**
   * Selected rowId
   * @type {string}
   */
  private rowId: string;

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  private subscriptions: Subscription[] = [];

  constructor(
    private dialogInstance: MatDialogRef<DeleteModalComponent>,
    private userStore: Store<UserState>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.rowId = data.rowId;
    this.subscriptions.push(
      this.userOptionState$.subscribe((data) => {
        if (data !== null) {
          this.isComplete = data['delete'].isComplete;
          this.isProcessing = data['delete'].isProcessing;

          if (data['delete'].error) {
            this.error = data['delete'].error ?? null;
            this.message = data['delete'].error?.message ?? '';
          }
        }
      })
    );
  }

  ngOnInit(): void {
    this.dialogInstance.disableClose = true;
  }

  public onDeleteCallback(): void {
    const ids = [];
    ids.push(this.rowId);
    this.userStore.dispatch(deleteUserOption({ userOptionIds: ids }));
  }

  public onClose(): void {
    this.dialogInstance.close();
  }

  ngOnDestroy(): void {
    this.userStore.dispatch(clearAddUpdateUserOptionsState());
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
