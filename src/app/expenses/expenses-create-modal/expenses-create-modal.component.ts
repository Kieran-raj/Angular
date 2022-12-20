import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { Expense } from 'src/app/shared/models/expense';
import { User } from 'src/app/shared/models/user';
import { loadCategories } from '../data-state/actions/transactions.action';
import {
  addNewCategory,
  addNewTransaction,
} from '../data-state/actions/updates.action';
import { selectCategories } from '../data-state/selectors/transactions.selectors';
import { selectUserInfo } from '../data-state/selectors/user.selector';
import { TransactionState } from '../data-state/states/transactions.state';
import { UpdateState } from '../data-state/states/update.state';
import { UserState } from '../data-state/states/user.state';

@Component({
  selector: 'app-expenses-create-modal',
  templateUrl: './expenses-create-modal.component.html',
  styleUrls: ['./expenses-create-modal.component.scss'],
})
export class ExpensesCreateModalComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  /**
   * Modal instance.
   * @type {NgbModalRef}
   */
  @Input()
  public modal: NgbModalRef;

  /**
   * Modal title.
   */
  @Input()
  public modalTitle: string;

  /**
   * Categories
   * @type {Observable<Category[]>}
   */

  public categories$: Observable<Category[] | null> | null;

  /**
   * Is new transaction.
   * @type {boolean}
   */
  public isNewTransaction: boolean;

  /**
   * Icons
   * @type {IconDefinition}
   */
  public faXmark: IconDefinition = faXmark;

  /**
   * Disable OK button
   * @type {boolean}
   */
  public disableOKButton = true;

  /**
   * Categories
   * @type {string[]}
   */
  public categories: string[] = [];

  /**
   * User
   * @type {User}
   */
  public user: User | null;

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  public subscriptions: Subscription[] = [];

  /**
   * Form Group
   * @type {FormGroup}
   */
  public formGroup = new FormGroup({
    category: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    date: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50),
    ]),
  });

  constructor(
    private transactionStore: Store<TransactionState>,
    private updatesStore: Store<UpdateState>,
    private userStore: Store<UserState>
  ) {
    this.subscriptions.push(
      this.userStore.select(selectUserInfo).subscribe((user) => {
        this.user = user;
      })
    );
    this.transactionStore.dispatch(loadCategories());
  }

  ngOnInit(): void {
    this.isNewTransaction = this.modalTitle
      .toLowerCase()
      .includes('transaction')
      ? true
      : false;

    this.categories$ = this.isNewTransaction
      ? this.transactionStore.select(selectCategories)
      : null;

    this.subscriptions.push(
      this.transactionStore.select(selectCategories).subscribe((data) => {
        data?.forEach((category) => this.categories.push(category.name));
      })
    );
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe((data) => {
        this.isFormValid(data);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe);
  }

  okCallBack() {
    let updates = {};
    if (!this.isNewTransaction) {
      const newCategory = this.formGroup.controls['category'].value;
      updates = {
        amount: null,
        category: this.formGroup.controls['category'],
        date: null,
        description: null,
        userId: null,
      };
      this.updatesStore.dispatch(addNewCategory({ category: newCategory }));
    }

    if (this.isNewTransaction) {
      updates = {
        amount: this.formGroup.controls['amount'].value,
        category: this.formGroup.controls['category'].value.name.toLowerCase(),
        date: this.formatStringToUtc(this.formGroup.controls['date'].value),
        description: this.formGroup.controls['description'].value,
        userId: this.user?.id,
      } as Expense;

      this.updatesStore.dispatch(addNewTransaction({ updates: updates }));
    }

    this.modal.close();
    this.clearForm();
  }

  dismissCallBack() {
    this.modal.dismiss();
    this.clearForm();
  }

  private formatStringToUtc(stringDate: string) {
    const time = new Date().getTime();
    const newDate = new Date(stringDate).setTime(time);
    return new Date(newDate).toISOString();
  }

  private clearForm() {
    this.formGroup.reset();
  }

  private isFormValid(formValues: any) {
    Object.keys(formValues).forEach((value) => {
      if (formValues[value] === '') {
        this.disableOKButton = true;
      }
      if (formValues[value]) {
        this.disableOKButton = false;
      }
    });
  }
}
