import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpMessage } from '../../models/auth-models/sign-up-message';
import { UserDetails } from '../../models/user-details';

@Injectable({
  providedIn: 'root',
})
export class UserSerivce {
  url: string;

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) {
    this.url = `${this.baseUrl}/api`;
  }

  signUp(details: UserDetails): Observable<SignUpMessage> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const options = { headers };

    const body = details;

    return this.http.post<SignUpMessage>(
      `${this.url}/user/create`,
      body,
      options
    );
  }

  checkDetails(email: string, displayName: string): Observable<SignUpMessage> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });

    const options = { headers };

    const body = { email: email, displayName: displayName };

    const response = this.http.post<SignUpMessage>(
      `${this.url}/user/check-details`,
      body,
      options
    );

    return response;
  }
}
