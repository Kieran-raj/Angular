import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SignUpMessage } from '../../models/auth-models/sign-up-message';
import { UserDetails } from '../../models/user-details';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserSerivce {
  url: string;

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) {
    this.url = `${this.baseUrl}/api`;
  }

  updateUserDetails(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const options = { headers };

    return this.http.post<User>(`${this.url}/user/update`, user, options);
  }

  getUserInfo(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/user/user-info?userId=${id}`);
  }
}
