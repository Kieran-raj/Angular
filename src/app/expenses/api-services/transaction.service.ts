import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/models/category';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { MonthlyExpense } from 'src/app/shared/models/monthly-expense';
import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { Expense } from 'src/app/shared/models/expense';
import { MovingAverageAmounts } from 'src/app/shared/models/moving-average-amounts';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  url: string;

  constructor(
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient
  ) {
    this.url = `${this.baseUrl}/api`;
  }

  getAllExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.url}/expense/all-expenses`);
  }

  // getYears(): Observable<any> {
  //   return this.http.get(`${this.url}/full_data/all_years`);
  // }

  getDailyAmounts(): Observable<DailyAmount[]> {
    return this.http.get<DailyAmount[]>(`${this.url}/expense/daily-amounts`);
  }

  getMonthlyAmounts(): Observable<MonthlyExpense[]> {
    return this.http.get<MonthlyExpense[]>(
      `${this.url}/expense/monthly-amounts`
    );
  }

  getCategoricalAmounts(): Observable<CategoricalAmounts[]> {
    return this.http.get<CategoricalAmounts[]>(
      `${this.url}/expense/categorical-amounts`
    );
  }

  getMovingAverage(window: string = '2'): Observable<MovingAverageAmounts[]> {
    const params = new HttpParams().set('window', window);
    return this.http.get<MovingAverageAmounts[]>(
      `${this.url}/expense/moving-average`,
      {
        params,
      }
    );
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/categories/all-categories`);
  }
}
