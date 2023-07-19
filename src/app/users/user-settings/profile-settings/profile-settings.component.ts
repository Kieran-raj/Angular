import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { updateUserDetails } from 'src/app/expenses/data-state/actions/user.action';
import { selectUserInfo } from 'src/app/expenses/data-state/selectors/user.selectors';
import { UserState } from 'src/app/expenses/data-state/states/user.state';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  /**
   * Encoded image string
   * @type {any}
   */
  public imageString: any;

  /**
   * User image
   * @type {any}
   */
  public image: any;

  /**
   * User
   * @type {Observable<User | null>}
   */
  public user$ = this.userStore.select(selectUserInfo);

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
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    displayName: new FormControl(null, [Validators.required]),
    image: new FormControl(null),
  });

  public isSaving$ = new BehaviorSubject(false);

  constructor(
    private sanitizer: DomSanitizer,
    private userStore: Store<UserState>
  ) {
    this.subscriptions.push(
      this.user$.subscribe((user) => {
        this.user = user;
      })
    );
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.user$.subscribe((user) => {
        if (user) {
          Object.keys(user).forEach((f) => {
            if (this.formGroup.controls[f]) {
              this.formGroup.controls[f].setValue(this.getUserValue(f, user));
            }
          });
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.clearForm();
  }

  private getUserValue(
    value: string,
    user: User | null
  ): string | number | undefined {
    switch (value) {
      case 'displayName': {
        return user?.displayName;
      }
      case 'email': {
        return user?.email;
      }
      case 'firstName': {
        return user?.firstName;
      }
      case 'lastName': {
        return user?.lastName;
      }
      default: {
        return undefined;
      }
    }
  }

  public uploadImage(fileInputEvent: any) {
    var reader = new FileReader();
    this.image = fileInputEvent.target.files[0];
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.image);
  }

  public okCallBack() {
    this.isSaving$.next(true);
  }

  private handleReaderLoaded(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.imageString = this.sanitizer.bypassSecurityTrustUrl(
      `data:image/png;base64, ${btoa(binaryString)}`
    );
  }

  private clearForm() {
    this.formGroup.reset();
  }
}

///https://www.behance.net/gallery/160949619/Profile-Settings-Page-for-a-Fintech-Web-App?tracking_source=search_projects|settings+page
