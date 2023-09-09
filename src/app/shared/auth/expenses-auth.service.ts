import { Injectable } from '@angular/core';
import { AuthService, IdToken } from '@auth0/auth0-angular';
import { UserState } from '../data-state/states/user.state';
import { Store } from '@ngrx/store';
import { setToken, setUserInfo } from '../data-state/actions/user.action';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesAuthService {
  /**
   * Auth0 user.
   * @type {Observable<User>}
   */
  public user$ = this.authService.user$;

  /**
   * Domain user
   * @type {User}
   */
  public domainUser: User;

  /**
   * Is user authenticated
   * @type {Observable<boolean>}
   */
  public isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(
    private authService: AuthService,
    private userStore: Store<UserState>
  ) {
    this.authService.idTokenClaims$.subscribe((data) => {
      if (data?.__raw) {
        this.userStore.dispatch(setToken({ token: data?.__raw }));
        const user = this.mapToUser(data);
        this.domainUser = user;
        this.userStore.dispatch(setUserInfo({ user: user }));

        this.authService.getAccessTokenSilently().subscribe((accessToken) => {
          localStorage.setItem('access_token', accessToken);
        });
      }
    });
  }

  public login() {
    this.authService.loginWithRedirect();

    console.log(`Is prod = ${environment.production}`);
  }

  public logout() {
    this.authService.logout({
      logoutParams: {
        returnTo: environment.logoutReturnUrl
      }
    });
  }

  private mapToUser(data: IdToken): User {
    const user = {} as User;

    user.id = data['sub'].split('|')[1];
    user.displayName = data?.nickname;
    user.email = data?.email ?? '';
    user.lastName = data?.family_name;
    user.firstName = data?.name;
    user.photo = data?.picture;

    return user;
  }
}
