import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  faTriangleExclamation,
  faCircleExclamation,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription, combineLatest, filter } from 'rxjs';
import { clearState } from 'src/app/shared/data-state/actions/transactions.action';
import { deleteUserAccount } from 'src/app/shared/data-state/actions/user.action';
import {
  selectIsUserDeleted,
  selectUserError,
  selectUserInfo
} from 'src/app/shared/data-state/selectors/user.selectors';
import { ExpensesAppState } from 'src/app/shared/data-state/states/expenses-app.state';
import { UserState } from 'src/app/shared/data-state/states/user.state';
import { User } from 'src/app/shared/models/user';
import { ExpensesAuthService } from 'src/app/shared/auth/expenses-auth.service';

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteAccountModalComponent implements OnInit {
  /**
   * Warning triangle
   * @type {IconDefinition}
   */
  public faInfoTriangle = faTriangleExclamation;

  /**
   * Circle exclamation icon
   * @type {IconDefinition}
   */
  public faCircleExclamation = faCircleExclamation;

  /**
   * Form Group
   * @type {FormGroup}
   */
  public formGroup = new FormGroup({
    userName: new FormControl('', [Validators.required])
  });

  /**
   * Is the form valid
   * @type {BehaviorSubject<boolean>}
   */
  public isValid$ = new BehaviorSubject<boolean>(false);

  /**
   * Is deleting
   * @type {BehaviorSubject<boolean>}
   */
  public isDeleting$ = new BehaviorSubject<boolean>(false);

  /**
   * Is user deleted
   * @type {Observable<boolean>}
   */
  public isUserDeleted$ = this.userStore.select(selectIsUserDeleted);

  /**
   * User error state
   */
  public userError$ = this.userStore.select(selectUserError);

  /**
   * User info
   * @type {Observable<User>}
   */
  private user$ = this.userStore.select(selectUserInfo);

  /**
   * Subscriptions
   * @type {Subscription}
   */
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dialogInstance: MatDialogRef<DeleteAccountModalComponent>,
    private userStore: Store<UserState>,
    private authService: ExpensesAuthService,
    private store: Store<ExpensesAppState>
  ) {}

  ngOnInit(): void {
    this.dialogInstance.addPanelClass('delete-dialog');
    this.dialogInstance.disableClose = true;

    this.subscriptions.push(
      combineLatest([this.formGroup.valueChanges, this.user$])
        .pipe(filter(([_, user]) => user !== null))
        .subscribe(([valueChanges, user]) => {
          this.isValid$.next(this.isFormValid(valueChanges, user));
        })
    );

    this.subscriptions.push(
      this.isUserDeleted$.subscribe((data) => {
        if (data) {
          this.dialogInstance.close();
          this.isDeleting$.next(false);
          this.logout();
        }
      })
    );
  }

  public onDelete() {
    this.isDeleting$.next(true);
    this.subscriptions.push(
      this.user$.subscribe((user: User | null) => {
        if (user) {
          this.userStore.dispatch(deleteUserAccount({ user: user }));
        }
      })
    );
  }

  public onClose() {
    this.dialogInstance.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private isFormValid(valueChanges: any, user: User | null): boolean {
    if (user === null || valueChanges === null) {
      return false;
    }

    if (valueChanges['userName'] === user.displayName) {
      return true;
    }

    return false;
  }

  private logout() {
    this.store.dispatch(clearState());
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
