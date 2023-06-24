import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  checkSignUpDetails,
  resetError,
  signUp,
} from 'src/app/expenses/data-state/actions/user.action';
import {
  selectSignUpDetails,
  selectUserError,
} from 'src/app/expenses/data-state/selectors/user.selectors';
import { UserState } from 'src/app/expenses/data-state/states/user.state';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  // Icons
  /**
   * Clear icon
   * @type {IconDefinition}
   */
  public faCross = faXmark;
  //

  /**
   * Show password
   * @type {boolean}
   */
  public showPasswordText = false;

  /**
   * Form group
   * @type {FormGroup}
   */
  public formGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    displayName: new FormControl(null, [Validators.required]),
  });

  /**
   * Disable signup button
   * @type {boolean}
   */
  public disableSignUpButton = true;

  /**
   * Error
   */
  public error$ = this.userStore.select(selectUserError);

  /**
   * Check details
   * @type {Observable<SignUpMessage>}
   */
  public signUpDetails$ = this.userStore.select(selectSignUpDetails);

  /**
   * Is loading
   * @type {BehaviorSubject<boolean>}
   */
  public isLoading$ = new BehaviorSubject(false);

  /**
   * Conflict message
   * @type {string}
   */
  public conflictErrorMessage = 'Username is already taken';

  /**
   * Has the user been created
   * @type {boolean}
   */
  public isCreated$ = new BehaviorSubject(false);

  /**
   * Show password field
   * @type {boolean}
   */
  public showPasswordField = false;

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  private subscriptions: Subscription[] = [];

  constructor(private userStore: Store<UserState>) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe((values) => {
        if (!this.showPasswordField) {
          this.isFormValid(values, ['password']);
        } else {
          this.isFormValid(values, null);
        }
        Object.keys(values).some((key: any) => {
          const val = this.formGroup.controls[key].value;
          if (key !== 'password' && val?.length === 0) {
            this.showPasswordField = false;
          }
        });
      })
    );

    this.subscriptions.push(
      this.signUpDetails$.subscribe((value) => {
        if (value?.statusCode.toString().startsWith('2')) {
          if (!Object.keys(this.formGroup.controls).includes('password')) {
            this.formGroup.addControl(
              'password',
              new FormControl(null, [Validators.required])
            );
          }
          this.showPasswordField = true;
          this.isLoading$.next(false);
          if (value.message.length === 0) {
            this.isCreated$.next(true);
          }
        }
      })
    );

    this.subscriptions.push(
      this.error$.subscribe((error) => {
        if (error) {
          this.isLoading$.next(false);
        }
      })
    );

    this.subscriptions.push(
      this.isCreated$.subscribe((isCreated) => {
        if (isCreated) {
          this.clearForm();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public checkUserDetails(email: string, displayName: string) {
    this.userStore.dispatch(
      checkSignUpDetails({ email: email, displayName: displayName })
    );
  }

  public clearForm(): void {
    this.closeError();
    this.formGroup.reset();
  }

  public signUpCallback() {
    this.isLoading$.next(true);
    const email = this.formGroup.controls['email'].value;
    const displayName = this.formGroup.controls['displayName'].value;
    this.formGroup.controls['password']?.value.length > 0 &&
    this.showPasswordField
      ? this.signUp()
      : this.checkUserDetails(email, displayName);
  }

  public togglePassword() {
    const ele = document.getElementById('password-input');
    const type = ele?.getAttribute('type');
    ele?.setAttribute('type', type === 'password' ? 'text' : 'password');
    this.showPasswordText = !this.showPasswordText;
  }

  public clearInput(field: string) {
    this.formGroup.controls[field].reset();

    if (field !== 'password') {
      this.showPasswordField = false;
    }
  }

  private signUp() {
    const details = {
      email: this.formGroup.controls['email'].value,
      displayName: this.formGroup.controls['displayName'].value,
      password: this.formGroup.controls['password'].value,
    };

    this.userStore.dispatch(signUp({ userDetails: details }));
  }

  private closeError() {
    this.userStore.dispatch(resetError());
  }

  private isFormValid(formValues: any, fieldsToIgnore: string[] | null): void {
    const values = formValues;

    if (fieldsToIgnore && fieldsToIgnore?.length > 0) {
      fieldsToIgnore.forEach((field) => delete values[field]);
    }

    const isValid = Object.values(values).every((value: any) => {
      if (value !== null && value.length > 0) {
        return true;
      }
      return false;
    });

    this.disableSignUpButton = isValid ? false : true;
  }
}
