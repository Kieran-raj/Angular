import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsLoggingIn } from '../expenses/data-state/selectors/user.selectors';
import { UserState } from '../expenses/data-state/states/user.state';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  /**
   * Page title
   * @type {string}
   */
  pageTitle: string = 'Home';

  /**
   * Is the user logged in
   * @type {BehaviorSubject<boolean>}
   */
  isLoggedIn$ = this.authService.isloggedIn$;

  /**
   * Is logging in
   * @type {Observable<boolean>}
   */
  isLoggingIn$ = this.userStore.select(selectIsLoggingIn);

  constructor(
    private authService: AuthService,
    private userStore: Store<UserState>
  ) {}

  ngOnInit(): void {}
}
