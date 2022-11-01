import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transactions } from 'src/app/shared/models/transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  url: string = 'http://192.168.1.43:5000//expenses';

  constructor(private http: HttpClient) {}

  getHistoricalTransactions(): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.url}/full_data`);
  }

  getYears(): Observable<any> {
    return this.http.get(`${this.url}/full_data/all_years`);
  }

  getFilteredTransactions(
    startDate: string,
    endDate: string,
    category: string
  ): Observable<Transactions> {
    return this.http.get<Transactions>(
      `${this.url}/filtered_data?startDate=${startDate}&endDate=${endDate}&category=${category}`
    );
  }

  getAmountsOnly(): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.url}/get_daily_amounts`);
  }

  getMonthlyAmounts(): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.url}/get_monthly_amounts`);
  }

  getCategoricalAmounts(): Observable<any> {
    return this.http.get(`${this.url}/get_categorical_amounts`);
  }
}
