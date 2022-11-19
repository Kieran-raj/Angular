import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transactions } from 'src/app/shared/models/transactions';
import { Category } from 'src/app/shared/models/category';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { MonthlyTransaction } from 'src/app/shared/models/monthly-transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  url: string;

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) {
    this.url = `${this.baseUrl}/api/expenses`;
  }

  getHistoricalTransactions(): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.url}/full_data`);
  }

  getYears(): Observable<any> {
    return this.http.get(`${this.url}/full_data/all_years`);
  }

  getDailyAmounts(): Observable<DailyAmount[]> {
    return this.http.get<DailyAmount[]>(`${this.url}/get_daily_amounts`);
  }

  getMonthlyAmounts(): Observable<MonthlyTransaction[]> {
    return this.http.get<MonthlyTransaction[]>(
      `${this.url}/get_monthly_amounts`
    );
  }

  getCategoricalAmounts(): Observable<any> {
    return this.http.get(`${this.url}/get_categorical_amounts`);
  }

  getMovingAverage(window: string = '2'): Observable<Transactions> {
    const params = new HttpParams().set('window', window);
    return this.http.get<Transactions>(
      `${this.url}/get_daily_amounts/moving_average`,
      { params }
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories`);
  }
}
