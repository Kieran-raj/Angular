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
    this.url = `${this.baseUrl}/expenses`;
  }

  updateCategory(body: Category[]): Observable<Category[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    const options = { headers };

    return this.http.post<Category[]>(`${this.url}/categories`, body, options);
  }
}
