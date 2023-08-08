import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  url: string;

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) {
    this.url = `${this.baseUrl}/api`;
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories/all-categories`);
  }
}
