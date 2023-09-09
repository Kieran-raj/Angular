import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faArrowTrendUp,
  faGear,
  faGrip,
  faHome,
  faSignOut,
  faUser,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { ExpensesAuthService } from 'src/app/shared/auth/expenses-auth.service';
import { User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  /**
   * User
   * @type {Observable<any>}
   */
  user$ = this.expensesAuthService.user$;

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

  /**
   * Encoded photo string
   * @type {any}
   */
  public photoString: any = './assets/images/userLogo.png';

  constructor(
    private expensesAuthService: ExpensesAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public signOut() {
    this.expensesAuthService.logout();
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }

  public getRoute(): string {
    return this.router.url;
  }

  public getUserPath(user: User | null | undefined): string {
    if (user) {
      return user.nickname ?? '';
    }
    return '';
  }

  public log(user: any) {
    console.log(user);
  }
}
