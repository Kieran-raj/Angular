import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RoutesRecognized
} from '@angular/router';
import {
  faBell,
  faGreaterThan,
  faLock,
  faUser,
  faX
} from '@fortawesome/free-solid-svg-icons';
import { DeleteAccountModalComponent } from '../delete-account-modal/delete-account-modal.component';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { UserState } from '@shared/data-state/states/user.state';
import { selectUserInfo } from '@shared/data-state/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { User } from '@shared/models/user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  /**
   * Selected settings template
   * @type {TemplateRef<any> | null}
   */
  selectedSettingsTemplate: TemplateRef<any> | null;

  selectedSettingsTemplate$ = new BehaviorSubject<TemplateRef<any> | null>(
    null
  );

  /**
   * Should the user settings nav bar be shown
   * @type {boolean}
   */
  showUserSettingsNavBar = true;

  /**
   * Should the component setting be shown
   * @type {boolean}
   */
  showComponentSetting = false;

  /**
   * Icon
   */
  faX = faX;
  faGreaterThanArrow = faGreaterThan;

  buttons = [
    {
      displayText: 'Profile Settings',
      customCssClass: 'item-text',
      icon: faUser,
      path: 'profile'
    },
    {
      displayText: 'Notification Settings',
      customCssClass: 'item-text',
      icon: faBell,
      path: 'notifications'
    },
    {
      displayText: 'Password',
      customCssClass: 'item-text',
      icon: faLock,
      path: 'password'
    }
  ];

  public pageTitle = 'Settings';

  /**
   * User observable
   * @type {Observable<User | null>}
   */
  public user$ = this.userStore.select(selectUserInfo);

  private deleteAccountDialogInstance: MatDialogRef<DeleteAccountModalComponent> | null;

  /**
   * Subscriptions
   * @type {Subscription[]}
   */
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private dialogSerive: MatDialog,
    private userStore: Store<UserState>,
    private offCanvcasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.router.events, this.user$]).subscribe(
        ([event, user]) => {
          if (event) {
            if (event instanceof NavigationStart) {
              this.offCanvcasService?.dismiss();
            } else if (event instanceof RoutesRecognized) {
              const userName = user?.displayName;
              if (userName && event.url.endsWith(userName)) {
                this.showUserSettingsNavBar = true;
                if (this.isMobileDevice()) {
                  this.showComponentSetting = false;
                }
              }
            }
          }
        }
      )
    );

    const currentUrlSegments = this.getRoute().split('/');
    const component = currentUrlSegments[currentUrlSegments.length - 1];

    this.setNavBar(component);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public getRoute(): string {
    return this.router.url;
  }

  public openDeleteDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '30rem';

    this.deleteAccountDialogInstance = this.dialogSerive.open(
      DeleteAccountModalComponent,
      dialogConfig
    );
  }

  public getDisplayUserName(user: User | null): string | undefined {
    if (!user?.firstName || !user.lastName) {
      return user?.displayName;
    } else {
      return `${user.firstName} ${user.lastName}`;
    }
  }

  private isMobileDevice() {
    return window.innerWidth <= 1200;
  }

  public launchMobileNavBar() {
    this.offCanvcasService.open(NavBarComponent);
  }

  public setNavBar(component: string): void {
    switch (component) {
      case 'profile': {
        if (this.isMobileDevice()) {
          this.showUserSettingsNavBar = false;
        }
        this.showComponentSetting = true;
        break;
      }
      case 'notifications': {
        if (this.isMobileDevice()) {
          this.showUserSettingsNavBar = false;
        }
        this.showComponentSetting = true;
        break;
      }
      default: {
        this.showUserSettingsNavBar = true;
        break;
      }
    }
  }
}
