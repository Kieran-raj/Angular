import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { updateUserDetails } from 'src/app/expenses/data-state/actions/user.action';
import {
  selectIsUserUpdated,
  selectUserInfo,
} from 'src/app/expenses/data-state/selectors/user.selectors';
import { UserState } from 'src/app/expenses/data-state/states/user.state';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
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
    displayName: new FormControl(null),
    photo: new FormControl(null),
  });

  /**
   * Initial form group data
   */
  public initialData: { [key: string]: string } = {};

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

    this.initialData = this.setInitialFormGroup(this.formGroup.controls);

    this.formGroup.controls['displayName'].disable();

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
      this.formGroup.valueChanges.subscribe((data) => {
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
    this.photoString = './assets/images/userLogo.png';
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
    Object.keys(this.initialData).forEach((key) => {
      this.formGroup.controls[key].setValue(this.initialData[key]);
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

  private handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.photoString = this.sanitizer.bypassSecurityTrustUrl(
      `data:image/png;base64, ${btoa(binaryString)}`
    );

    this.formGroup.controls['photo'].setValue(this.photoString);
  }

  private clearForm() {
    this.formGroup.reset();
  }

  private setInitialFormGroup(controls: {
    [key: string]: AbstractControl;
  }): any {
    const data: { [key: string]: any } = {};
    Object.keys(controls).forEach((control) => {
      data[control] = controls[control].value;
    });

    return data;
  }

  private isEqual(valueChanges: User) {
    return (
      valueChanges.email === this.initialData['email'] &&
      valueChanges.firstName == this.initialData['firstName'] &&
      valueChanges.lastName == this.initialData['lastName']
    );
  }
}

///https://www.behance.net/gallery/160949619/Profile-Settings-Page-for-a-Fintech-Web-App?tracking_source=search_projects|settings+page
// https://dribbble.com/shots/17219796/attachments/12323150?mode=media
