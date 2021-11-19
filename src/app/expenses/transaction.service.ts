import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  url: string = 'http://192.168.1.57:5000/expenses';

  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<any> {
    return this.http.get(`${this.url}/full_data`);
  }

  getFilteredTransactions(
    startDate: string,
    endDate: string,
    category: string
  ): Observable<any> {
    console.log(
      `${this.url}/filtered_data?startDate=${startDate}&endDate=${endDate}&category=${category}`
    );
    return this.http.get(
      `${this.url}/filtered_data?startDate=${startDate}&endDate=${endDate}&category=${category}`
    );
  }

  getAmountsOnly(): Observable<any> {
    return this.http.get(`${this.url}/get_daily_amounts`);
  }

  getCategoricalAmounts(): Observable<any> {
    return this.http.get(`${this.url}/get_categorical_amounts`);
  }
}
