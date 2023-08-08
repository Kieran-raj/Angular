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
import { BuinessRuleContext } from 'src/app/shared/business-rules/business-rule-context';
import { ProfileSettingsBusinessRule } from 'src/app/shared/business-rules/rules/ProfileSettingsBusinessRule';
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
    displayName: new FormControl(null),
    photo: new FormControl(null)
  });

  /**
   * Is the form being saved
   * @type {BehaviorSubject<boolean>}
   */
  public isSaving$ = new BehaviorSubject<boolean>(false);

  /**
   * Initial form group data
   */
  private initialFormData: { [key: string]: any } = {};

  constructor(
    private sanitizer: DomSanitizer,
    private userStore: Store<UserState>,
    private businessRuleContext: BuinessRuleContext
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
        }
      })
    );

    this.subscriptions.push(
      this.isUpdated$.subscribe((isUpdated) => {
        if (isUpdated) {
          this.isSaving$.next(false);
          const businessRuleData = {
            initialData: this.initialFormData,
            currentData: this.initialFormData
          };

          const result = this.businessRuleContext.executeRule(
            ProfileSettingsBusinessRule.name,
            businessRuleData
          );

          this.disableCancel = result.result?.['disableCancel'];
          this.disableSave = result.result?.['disableSave'];
        }
      })
    );

    this.subscriptions.push(
      this.formGroup?.valueChanges.subscribe((data) => {
        if (data && Object.keys(this.initialFormData).length > 0) {
          const businessRuleData = {
            initialData: this.initialFormData,
            currentData: data
          };

          const result = this.businessRuleContext.executeRule(
            ProfileSettingsBusinessRule.name,
            businessRuleData
          );

          this.disableCancel = result.result?.['disableCancel'];
          this.disableSave = result.result?.['disableSave'];

          return;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.clearForm();
  }

  public okCallBack() {
    this.isSaving$.next(true);
    const updatedClone = { ...this.user } as any;
    Object.keys(this.formGroup.controls).forEach((control) => {
      const controlValue = this.formGroup.controls[control].value;
      if (updatedClone && (controlValue || control === 'photo')) {
        updatedClone[control] = controlValue;
      }
    });

    this.userStore.dispatch(updateUserDetails({ user: updatedClone }));
  }

  public activateEdit(controlName: string) {
    this.formGroup.controls[controlName].enable();
  }

  public cancelCallBack() {
    this.formGroup.controls['displayName'].disable();
    Object.keys(this.initialFormData).forEach((key) => {
      this.formGroup.controls[key].setValue(this.initialFormData[key]);
    });
  }

  public getImage() {
    var photoValue = this.formGroup?.controls['photo'].value;
    if (photoValue) {
      return this.sanitizer.bypassSecurityTrustUrl(photoValue);
    }
    return './assets/images/userLogo.png';
  }

  public deleteImage() {
    this.formGroup.controls['photo'].setValue(null);
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

    this.formGroup.controls['photo'].setValue(
      `data:image/png;base64, ${btoa(binaryString)}`
    );
  }

  private clearForm() {
    this.formGroup.reset();
  }
}
