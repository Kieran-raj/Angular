import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  url: string = 'http://192.168.1.57:5000/expenses/full_data';

  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<any> {
    return this.http.get(this.url);
  }
}
