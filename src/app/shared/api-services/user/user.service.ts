import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@shared/models/user';
import { UserOption } from '@shared/models/user-option';

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

  deleteUser(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const options = { headers };

    return this.http.post(`${this.url}/user/delete`, user, options);
  }

  deleteUserOptions(optionIds: string[]): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const options = { headers };

    const body = {
      userOptionIds: optionIds
    };

    return this.http.post(`${this.url}/user/delete-options`, body, options);
  }

  addUpdateUserOptions(userOption: UserOption): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    const options = { headers };
    return this.http.post(
      `${this.url}/user/add-update-user-option`,
      userOption,
      options
    );
  }
}
