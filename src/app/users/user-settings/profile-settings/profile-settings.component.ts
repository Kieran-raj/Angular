import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { updateUserDetails } from 'src/app/expenses/data-state/actions/user.action';
import {
  selectIsUserUpdated,
  selectUserInfo
} from 'src/app/expenses/data-state/selectors/user.selectors';
import { UserState } from 'src/app/expenses/data-state/states/user.state';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  /**
   * Encoded photo string
   * @type {any}
   */
  public photoString: any = './assets/images/userLogo.png';

  /**
   * User photo
   * @type {any}
   */
  public photo: any;

  /**
   * User observable
   * @type {Observable<User | null>}
   */
  public user$ = this.userStore.select(selectUserInfo);

  /**
   * Is user updated
   * @type {Observable<boolean>}
   */
  public isUpdated$ = this.userStore.select(selectIsUserUpdated);

  /**
   * User
   * @type {User | null}
   */
  public user: User | null;

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  public subscriptions: Subscription[] = [];

  /**
   * Disable cancel button
   * @type {boolean}
   */
  public disableCancel = true;

  /**
   * Disable save button
   * @type {boolean}
   */
  public disableSave = true;

  /**
   * Form Group
   * @type {FormGroup}
   */
  public formGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(null),
    displayName: new FormControl({ value: null, disabled: true }),
    photo: new FormControl(null)
  });

  /**
   * Initial form group data
   */
  public initialFormData: { [key: string]: any } = {};

  /**
   * Is the form being saved
   * @type {BehaviorSubject<boolean>}
   */
  public isSaving$ = new BehaviorSubject<boolean>(false);

  constructor(
    private sanitizer: DomSanitizer,
    private userStore: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.user$.subscribe((user) => {
        this.user = user;
        if (user) {
          Object.keys(user).forEach((f) => {
            const userObject = user as any;
            if (this.formGroup.controls[f]) {
              this.formGroup.controls[f].setValue(userObject[f]);
            }
          });

          this.initialFormData = this.formGroup.value;

          // The way the button behaves should be reworked potentially
          this.disableCancel = true;
          this.disableSave = true;
        }
      })
    );

    this.subscriptions.push(
      this.isUpdated$.subscribe((isUpdated) => {
        if (isUpdated) {
          this.isSaving$.next(false);
        }
      })
    );

    this.subscriptions.push(
      this.isSaving$.subscribe((isSaving) => {
        if (isSaving) {
          Object.keys(this.formGroup.controls).forEach((control) => {
            this.formGroup.controls[control].disable();
          });
        }
      })
    );

    //  Come up with better way. Maybe convert User to class and have isEqual() method
    //  Gonna need quite a lot of business logic for the form, business rules engine

    //  Takes the form, then applies any rules (1 for fields, 1 for buttons) we have, and our form is subscribed to those rules
    //  Loop through the rules and apply
    //  Most like have a BehaviourSubject in BusinessRule class, which will subscribe, and fire any rules when changes happen

    //   eg
    //   const ruleResult = {
    //     buttons: [
    //       {
    //         cancel: {
    //           isDisabled: true,
    //         },
    //         save: {
    //           isDisabled: true,
    //         },
    //       },
    //     ],
    //     fields: [
    //       {
    //         email: {
    //           isDisabled: true,
    //         },
    //       },
    //     ],
    //   };

    this.subscriptions.push(
      this.formGroup?.valueChanges.subscribe((data) => {
        if (data) {
          if (this.isEqual(data)) {
            this.disableSave = true;
            this.disableCancel = true;
            return;
          }

          this.disableSave = false;
          this.disableCancel = false;
          return;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.clearForm();
  }

  public deleteImage() {
    this.formGroup.controls['photo'].setValue('./assets/images/userLogo.png');
    this.disableCancel = false;
    this.disableSave = false;
  }

  public okCallBack() {
    this.isSaving$.next(true);
    const updatedClone = { ...this.user } as any;
    Object.keys(this.formGroup.controls).forEach((control) => {
      const controlValue = this.formGroup.controls[control].value;
      if (updatedClone && controlValue) {
        updatedClone[control] = controlValue;
      }
    });

    this.userStore.dispatch(updateUserDetails({ user: updatedClone }));
  }

  public activateEdit(controlName: string) {
    this.formGroup.controls[controlName].enable();
    this.disableCancel = false;
  }

  public reset() {
    this.formGroup.controls['displayName'].disable();
    Object.keys(this.initialFormData).forEach((key) => {
      this.formGroup.controls[key].setValue(this.initialFormData[key]);
    });
  }

  public isDisabled(isSaving: boolean, controlName: string) {
    if (isSaving) {
      return true;
    }
    return true;
  }

  public uploadImage(fileInputEvent: any) {
    var reader = new FileReader();
    this.photo = fileInputEvent.target.files[0];
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.photo);
  }

  public getImage() {
    /// Not working if there isnt an image

    var photoValue = this.formGroup?.controls['photo'].value;
    if (photoValue) {
      return this.sanitizer.bypassSecurityTrustUrl(photoValue);
    }
    return './assets/images/userLogo.png';
  }

  private handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.photoString = this.sanitizer.bypassSecurityTrustUrl(
      `data:image/png;base64, ${btoa(binaryString)}`
    );

    this.formGroup.controls['photo'].setValue(
      `data:image/png;base64, ${btoa(binaryString)}`
    );
  }

  private clearForm() {
    this.formGroup.reset();
  }

  private isEqual(valueChanges: User) {
    // Some issues when photo is added to the check
    return (
      valueChanges.email === this.initialFormData['email'] &&
      valueChanges.firstName == this.initialFormData['firstName'] &&
      valueChanges.lastName == this.initialFormData['lastName'] &&
      valueChanges.displayName == this.initialFormData['displayName']
    );
  }
}
