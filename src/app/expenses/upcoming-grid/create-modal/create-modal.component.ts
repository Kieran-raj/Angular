import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  addUpdateUserOption,
  clearAddUpdateUserOptionsState
} from '@shared/data-state/actions/user.action';
import { selectUserOptionAction } from '@shared/data-state/selectors/user.selectors';
import { UserState } from '@shared/data-state/states/user.state';
import { UserOption } from '@shared/models/user-option';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit, OnDestroy, AfterViewInit {
  public frequency = Frequency;

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
   * Is create button disabled.
   * @type {BehaviorSubject<boolean>}
   */
  public isCreateButtonDisabled$ = new BehaviorSubject(true);

  public error: {
    message: string | null;
    statusCode: number | null;
  } | null;

  /**
   * Form group
   * @type {FormGroup}
   */
  public formGroup = new FormGroup({
    optionName: new FormControl(null, [Validators.required]),
    optionType: new FormControl(null, [Validators.required]),
    optionValue: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]*(.[0-9]{0,2})?$')
    ]),
    frequency: new FormControl(null, [Validators.required]),
    isOutGoing: new FormControl(null, [])
  });

  public userOptionActionState$ = this.userStore.select(
    selectUserOptionAction('add')
  );

  private subscriptions: Subscription[] = [];

  constructor(
    private userStore: Store<UserState>,
    private dialogInstance: MatDialogRef<CreateModalComponent>
  ) {
    this.subscriptions.push(
      this.userOptionActionState$.subscribe((data) => {
        if (data != null) {
          this.isComplete = data.isComplete;
          this.isProcessing = data.isProcessing;

          if (data.error) {
            this.error = data.error ?? null;
          }
        }
      })
    );
  }

  ngOnInit(): void {
    this.dialogInstance.disableClose = true;
  }

  ngOnDestroy(): void {
    this.userStore.dispatch(clearAddUpdateUserOptionsState());
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.formGroup.valueChanges.subscribe((data) => {
        this.isFormValid(data);
      })
    );
  }

  public onCreateCallback(): void {
    const userOption = {} as UserOption;

    userOption.OptionName = this.formGroup.controls['optionName'].value;
    userOption.OptionType = {
      Type: this.formGroup.controls['optionType'].value
    };
    userOption.OptionValue = {
      Value: this.formGroup.controls['optionValue'].value
    };

    userOption.MetaData = {
      IsOutGoing: this.formGroup.controls['isOutGoing'].value ?? false,
      Frequency: this.formGroup.controls['frequency'].value
    };

    this.userStore.dispatch(
      addUpdateUserOption({ action: 'add', userOption: userOption })
    );
  }

  public onCancel(): void {
    this.clearForm();
    this.dialogInstance.close();
  }

  private clearForm() {
    this.formGroup.reset();
  }

  private isFormValid(formValues: any) {
    // Massively needs improving!!!
    Object.keys(formValues).forEach((value) => {
      if (!this.formGroup.controls[value].valid) {
        this.isCreateButtonDisabled$.next(true);
      }
      if (formValues[value]) {
        this.isCreateButtonDisabled$.next(false);
      }
    });
  }
}

enum Frequency {
  Daily,
  Monthly,
  Yearly
}
