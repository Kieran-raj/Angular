import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthToken } from '../models/auth-models/auth-token';
import { User } from '../models/user';

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
   * User
   * @type {User}
   */
  private _user: User;

  /**
   * Logged in
   * @type {BehaviorSubject<boolean>}
   */
  public isloggedIn$ = new BehaviorSubject<boolean>(
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
    this.isloggedIn$.next(false);
  }

  public setSession(authToken: AuthToken) {
    localStorage.setItem('id_token', authToken.token);
    localStorage.setItem('expires_at', authToken.expirationTime);
    const decodedToken = this.decodedToken();

    const user = {
      id: decodedToken.Id,
      displayName: decodedToken.DisplayName,
      email: decodedToken.Email,
    };

    this.user = user;
  }

  public getAuthTokenObject() {
    return {
      token: this.getToken(),
      expirationTime: localStorage.getItem('expires_at'),
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

  public setUser() {
    const decodedToken = this.decodedToken();

    const user = {
      id: decodedToken.Id,
      displayName: decodedToken.DisplayName,
      email: decodedToken.Email,
    };

    this.user = user;
  }

  public get user(): User {
    return this._user;
  }

  private set user(user: User) {
    this._user = user;
  }

  private getToken() {
    return localStorage.getItem('id_token');
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
