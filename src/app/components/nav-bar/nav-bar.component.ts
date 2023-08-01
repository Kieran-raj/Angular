import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowTrendUp,
  faGear,
  faGrip,
  faHome,
  faSignOut,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { clearState } from 'src/app/expenses/data-state/actions/transactions.action';
import { userLogOut } from 'src/app/expenses/data-state/actions/user.action';
import { selectUserInfo } from 'src/app/expenses/data-state/selectors/user.selectors';
import { ExpensesAppState } from 'src/app/expenses/data-state/states/expenses-app.state';
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
  user$ = this.userStore.select(selectUserInfo);

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
   * Settings icon
   * @type {IconDefinition}
   */
  faGear = faGear;

  constructor(
    private authService: AuthService,
    private userStore: Store<UserState>,
    private store: Store<ExpensesAppState>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public signOut() {
    this.userStore.dispatch(userLogOut());
    this.store.dispatch(clearState());
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }

  public getRoute(): string {
    return this.router.url;
  }

  public getUserPath(user: User | null): string {
    if (user) {
      return user.displayName;
    }
    return '';
  }
}
