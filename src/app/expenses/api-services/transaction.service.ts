import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transactions } from 'src/app/shared/models/transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  url: string;

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) {
    this.url = `${baseUrl}/expenses`;
  }

  getHistoricalTransactions(): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.url}/full_data`);
  }

  getYears(): Observable<any> {
    return this.http.get(`${this.url}/full_data/all_years`);
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
