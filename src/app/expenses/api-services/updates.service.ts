import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class UpdatesService {
  url: string;

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) {
    this.url = `${this.baseUrl}/api`;
  }

  updateCategory(body: Category): Observable<Category[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const options = { headers };

    return this.http.post<Category[]>(
      `${this.url}/categories/create-update`,
      body,
      options
    );
  }

  updateCreateTransaction(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const options = { headers };

    return this.http.post<any>(
      `${this.url}/expense/create-update`,
      body,
      options
    );
  }

  deleteTransaction(body: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const options = { headers: headers, body: body };

    return this.http.delete<any>(`${this.url}/expense/delete-expense`, options);
  }
}
