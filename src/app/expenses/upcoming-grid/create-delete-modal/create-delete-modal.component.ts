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
import { deleteUserOption } from 'src/app/shared/data-state/actions/user.action';
import { selectUserOptionState } from 'src/app/shared/data-state/selectors/user.selectors';
import { UserState } from 'src/app/shared/data-state/states/user.state';

@Component({
  selector: 'app-create-delete-modal',
  templateUrl: './create-delete-modal.component.html',
  styleUrls: ['./create-delete-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateDeleteModalComponent implements OnInit, OnDestroy {
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
    private dialogInstance: MatDialogRef<CreateDeleteModalComponent>,
    private userStore: Store<UserState>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.rowId = data.rowId;
    this.subscriptions.push(
      this.userOptionState$.subscribe((data) => {
        if (data !== null) {
          this.isComplete = data['delete'].isComplete;
          this.isProcessing = data['delete'].isProcessing;
          if (this.isComplete) {
            this.dialogInstance.close({ isComplete: true });
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
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
