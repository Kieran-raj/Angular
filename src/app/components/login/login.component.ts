import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  resetError,
  userLogin,
} from 'src/app/expenses/data-state/actions/user.action';
import { selectUserError } from 'src/app/expenses/data-state/selectors/user.selectors';
import { UserState } from 'src/app/expenses/data-state/states/user.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * User icon
   * @type {IconDefinition}
   */
  public faUser = faUser;

  /**
   * Password icon
   * @type {IconDefinition}
   */
  public faLock = faLock;

  /**
   * Modal title
   * @type {string}
   */
  public modalTitle = 'Login';

  /**
   * Disable login button
   */
  public disableLoginButton = true;

  /**
   * Form Group
   * @type {FormGroup}
   */
  public formGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  /**
   * Error
   */
  public error$ = this.userStore.select(selectUserError);

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  public subscriptions: Subscription[] = [];

  constructor(private userStore: Store<UserState>) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe((values) => {
        this.isFormValid(values);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public loginCallBack(): void {
    // const e = 'admin@test.com';
    // const p = 'testps';
    const email = this.formGroup.controls['email'].value;
    const password = this.formGroup.controls['password'].value;
    this.userStore.dispatch(
      userLogin({ email: email, password: password, isloggingIn: true })
    );
    this.clearForm();
  }

  public closeError() {
    this.userStore.dispatch(resetError());
  }

  private clearForm(): void {
    this.formGroup.reset();
  }

  private isFormValid(formValues: any): void {
    const isValid = Object.values(formValues).every((value: any) => {
      if (value !== null && value.length > 0) {
        return true;
      }
      return false;
    });

    this.disableLoginButton = isValid ? false : true;
  }
}
