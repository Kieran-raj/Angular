import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, first, Observable, Subscription, take } from 'rxjs';
import { selectUserToken } from 'src/app/expenses/data-state/selectors/user.selector';
import { UserState } from 'src/app/expenses/data-state/states/user.state';
import { AuthToken } from '../models/auth-models/auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Url
   * @type {string}
   */
  private url: string;

  /**
   * Logged in
   * @type {BehaviorSubject<boolean>}
   */
  public isloggedIn = new BehaviorSubject<boolean>(
    this.isValidSession() ? true : false
  );

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) {
    this.url = `${this.baseUrl}/api`;
  }

  public login(email: string, password: string): Observable<AuthToken> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const options = { headers };

    const body = {
      email: email,
      password: password,
    };
    return this.http.post<AuthToken>(`${this.url}/auth/token`, body, options);
  }

  public logout() {
    this.removeSession();
    this.isloggedIn.next(false);
  }

  public setSession(authToken: AuthToken) {
    localStorage.setItem('id_token', authToken.token);
    localStorage.setItem('expires_at', authToken.expirationTime);
  }

  public getToken() {
    return localStorage.getItem('id_token');
  }

  public getAuthTokenObject() {
    return {
      token: this.getToken(),
      expirationTime: localStorage.getItem('expires_at'),
      userId: '1',
    } as AuthToken;
  }

  public decodedToken(): any {
    let decodedToken: any;
    const token = localStorage.getItem('id_token');
    if (token) {
      decodedToken = jwtDecode(token) as any;
    }

    return decodedToken;
  }

  private isTokenExpired() {
    var expireDate = localStorage.getItem('expires_at');
    if (expireDate !== null) {
      if (new Date() > new Date(Number(expireDate) * 1000)) {
        return true;
      }
      return false;
    }
    return false;
  }

  private hasToken() {
    var token = this.getToken();
    return token !== null ? true : false;
  }

  private isValidSession() {
    if (!this.hasToken() || this.isTokenExpired()) {
      return false;
    }
    return true;
  }

  private removeSession() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
}
