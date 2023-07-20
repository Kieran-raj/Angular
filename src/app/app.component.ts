import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';
import { UserState } from './expenses/data-state/states/user.state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { selectUserToken } from './expenses/data-state/selectors/user.selectors';
import {
  setUserInfo,
  userLoginSuccess,
} from './expenses/data-state/actions/user.action';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /**
   * User
   * @type {User}
   */
  private user: User | null;

  /**
   * Auth Token
   * @type {Observable<AuthToken>}
   */
  private authToken$ = this.userStore.select(selectUserToken);

  private subscriptions: Subscription[] = [];
  ngOnInit(): void {}

  constructor(
    private authService: AuthService,
    private userStore: Store<UserState>
  ) {
    if (this.authService.isloggedIn$.value) {
      console.log('IsLoggedIn triggered');
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
}
