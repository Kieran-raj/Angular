import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowTrendUp,
  faChartLine,
  faChartSimple,
  faGear,
  faGrip,
  faHome,
  faSignOut,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import jwtDecode from 'jwt-decode';
import { Subscription } from 'rxjs';
import {
  setUserInfo,
  userLoginSuccess,
  userLogOut,
} from 'src/app/expenses/data-state/actions/user.action';
import { selectUserToken } from 'src/app/expenses/data-state/selectors/user.selector';
import { UserState } from 'src/app/expenses/data-state/states/user.state';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  /**
   * User
   * @type {User}
   */
  user: User | null;

  /**
   * User Icon
   * @type {IconDefinition}
   */
  faUser = faUser;

  /**
   * Sign Out icon
   * @type {IconDefinition}
   */
  faSignOut = faSignOut;

  /**
   * Settings Icon
   * @type {IconDefinition}
   */
  faSettingsIcon = faGear;

  /**
   * Home Icon
   * @type {IconDefinition}
   */
  faHome = faHome;

  /**
   * Dashboard grid icon
   * @type {IconDefinition}
   */
  faGrid = faGrip;

  /**
   * Stocks icon
   * @type {IconDefinition}
   */
  faChart = faArrowTrendUp;

  /**
   * Auth Token
   * @type {Observable<AuthToken>}
   */
  authToken$ = this.userStore.select(selectUserToken);

  subscriptions: Subscription[] = [];

  navLinkClass: string = '';

  constructor(
    private authService: AuthService,
    private userStore: Store<UserState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isloggedIn.value) {
      const token = this.authService.getAuthTokenObject();
      if (token) {
        this.userStore.dispatch(userLoginSuccess({ authToken: token }));
      }
    }

    this.subscriptions.push(
      this.authToken$.subscribe((authToken) => {
        if (!authToken) {
          this.user = null;
        }

        if (authToken && Object.keys(authToken).length > 0) {
          const token = authToken.token;
          const decodedToken = jwtDecode(token) as any;
          this.user = {
            id: decodedToken.Id,
            displayName: decodedToken.DisplayName,
            email: decodedToken.Email,
          };
          this.userStore.dispatch(setUserInfo({ user: this.user }));
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public signOut() {
    this.userStore.dispatch(userLogOut());
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }

  public getRoute(): string {
    return this.router.url;
  }
}
