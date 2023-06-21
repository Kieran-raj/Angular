import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
   * Subscriptions
   * @type {Subscription[]}
   */
  private subscriptions: Subscription[] = [];

  constructor(private userStore: Store<UserState>) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe((values) => {
        this.isFormValid(values);
      })
    );

    this.subscriptions.push(
      this.signUpDetails$.subscribe((value) => {
        if (value?.statusCode.toString().startsWith('2')) {
          this.formGroup.addControl(
            'password',
            new FormControl(null, [Validators.required])
          );
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

  public closeError() {
    this.userStore.dispatch(resetError());
  }

  public signUpCallback() {
    this.isLoading$.next(true);
    const email = this.formGroup.controls['email'].value;
    const displayName = this.formGroup.controls['displayName'].value;
    this.formGroup.controls['password']?.value.length > 0
      ? this.signUp()
      : this.checkUserDetails(email, displayName);
  }

  private signUp() {
    const details = {
      email: this.formGroup.controls['email'].value,
      displayName: this.formGroup.controls['displayName'].value,
      password: this.formGroup.controls['password'].value,
    };

    this.userStore.dispatch(signUp({ userDetails: details }));
  }

  private clearForm(): void {
    this.closeError();
    this.formGroup.reset();
  }

  private isFormValid(formValues: any): void {
    const isValid = Object.values(formValues).every((value: any) => {
      if (value !== null && value.length > 0) {
        return true;
      }
      return false;
    });

    this.disableSignUpButton = isValid ? false : true;
  }
}
