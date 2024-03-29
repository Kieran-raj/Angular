import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit
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
import { modalSettings } from 'src/app/shared/settings/modal-settings';
import { loadCategories } from '../../shared/data-state/actions/category.action';
import {
  addNewCategory,
  createUpdateTransaction,
  deleteTransaction,
  resetUpdateState
} from '../../shared/data-state/actions/updates.action';
import { selectCategories } from '../../shared/data-state/selectors/category.selectors';
import { selectChosenExpense } from '../../shared/data-state/selectors/transactions.selectors';
import { selectUserInfo } from '../../shared/data-state/selectors/user.selectors';
import { CategoryState } from '../../shared/data-state/states/category.state';
import { TransactionState } from '../../shared/data-state/states/transactions.state';
import { UpdateState } from '../../shared/data-state/states/update.state';
import { UserState } from '../../shared/data-state/states/user.state';

@Component({
  selector: 'app-expenses-create-modal',
  templateUrl: './expenses-create-modal.component.html',
  styleUrls: ['./expenses-create-modal.component.scss']
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
   * Modal action.
   * @type {string}
   */
  @Input()
  public modalAction: string = '';

  /**
   * Categories
   * @type {Observable<Category[]>}
   */

  public categories$: Observable<Category[] | null> | null;

  /**
   * Chosen Expense
   * @type {Expense | null}
   */
  public chosenExpense: Expense | null;

  /**
   * Action settings
   * @type {any}
   */
  public actionSettings: any;

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
      Validators.pattern('^[0-9]*(.[0-9]{0,2})?$')
    ]),
    date: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50)
    ])
  });

  constructor(
    private transactionStore: Store<TransactionState>,
    private categoryStore: Store<CategoryState>,
    private updatesStore: Store<UpdateState>,
    private userStore: Store<UserState>
  ) {
    this.subscriptions.push(
      this.userStore.select(selectUserInfo).subscribe((user) => {
        this.user = user;
      })
    );
    this.categoryStore.dispatch(loadCategories());

    this.subscriptions.push(
      this.transactionStore
        .select(selectChosenExpense)
        .subscribe((expense: Expense | null) => {
          this.chosenExpense = expense;
        })
    );
  }

  ngOnInit(): void {
    this.actionSettings = modalSettings[this.modalAction];

    if (this.modalAction === 'deleteTransaction') {
      this.disableOKButton = false;
    }

    this.categories$ = this.categoryStore.select(selectCategories);

    this.subscriptions.push(
      this.categoryStore.select(selectCategories).subscribe((data) => {
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
    this.updatesStore.dispatch(resetUpdateState());
  }

  okCallBack() {
    let updates = {};
    if (this.modalAction === 'newCategory') {
      const newCategory = this.formGroup.controls['category'].value;
      updates = {
        amount: null,
        category: this.formGroup.controls['category'],
        date: null,
        description: null,
        userId: null
      };
      this.updatesStore.dispatch(addNewCategory({ category: newCategory }));
    }

    if (
      this.modalAction === 'newTransaction' ||
      this.modalAction === 'editTransaction'
    ) {
      updates = {
        amount: this.formGroup.controls['amount'].value,
        category: this.formGroup.controls['category'].value.name.toLowerCase(),
        date: this.formatStringToUtc(this.formGroup.controls['date'].value),
        description: this.formGroup.controls['description'].value,
        userId: this.user?.id.toString(),
        id: this.modalAction === 'editTransaction' ? this.chosenExpense?.id : 0
      } as Expense;

      this.updatesStore.dispatch(
        createUpdateTransaction({ updates: updates, action: this.modalAction })
      );
    }

    if (this.modalAction === 'deleteTransaction') {
      this.updatesStore.dispatch(
        deleteTransaction({ expense: this.chosenExpense })
      );
    }

    this.modal.close();
    this.clearForm();
  }

  dismissCallBack() {
    this.modal.dismiss();
    this.clearForm();
  }

  private formatStringToUtc(stringDate: string) {
    const time = new Date();
    const milliseconds = time.getUTCMilliseconds();
    const seconds = time.getUTCSeconds();
    const hours = time.getUTCHours();
    const newDate = new Date(stringDate);

    const utcDate = Date.UTC(
      newDate.getUTCFullYear(),
      newDate.getUTCMonth(),
      newDate.getDate(),
      hours,
      time.getUTCMinutes(),
      seconds,
      milliseconds
    );

    return new Date(utcDate).toISOString();
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
