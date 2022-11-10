import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { addNewCategory } from '../data-state/actions/updates.action';
import { UpdateState } from '../data-state/states/update.state';

@Component({
  selector: 'app-expenses-create-modal',
  templateUrl: './expenses-create-modal.component.html',
  styleUrls: ['./expenses-create-modal.component.scss'],
})
export class ExpensesCreateModalComponent implements OnInit {
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
   * Is new transaction.
   * @type {boolean}
   */
  public isNewTransaction: boolean;

  /**
   * Icons
   */
  public faXmark: IconDefinition = faXmark;

  /**
   * Form Group
   * @type {FormGroup}
   */
  public formGroup = new FormGroup({
    category: new FormControl(''),
    amount: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private updatesStore: Store<UpdateState>) {}

  ngOnInit(): void {
    this.isNewTransaction = this.modalTitle
      .toLowerCase()
      .includes('transaction')
      ? true
      : false;
  }

  okCallBack() {
    if (!this.isNewTransaction) {
      const newCategory = this.formGroup.controls['category'].value;
      this.updatesStore.dispatch(addNewCategory({ category: newCategory }));
    }

    this.modal.close();
    this.clearForm();
  }

  dismissCallBack() {
    this.modal.dismiss();
    this.clearForm();
  }

  private clearForm() {
    this.formGroup.reset();
  }
}
