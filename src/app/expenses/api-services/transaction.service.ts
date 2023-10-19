import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyAmount } from 'src/app/shared/models/daily-expense';
import { CategoricalAmounts } from 'src/app/shared/models/categorical-amounts';
import { Expense } from 'src/app/shared/models/expense';
import { MonthlyInOut } from 'src/app/shared/models/monthly-ins-outs';
import { UpcomingExpense } from 'src/app/shared/models/upcoming-expense';

@Injectable({
  providedIn: 'root'
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

  getUserExpenses(userId: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(
      `${this.url}/expense/all-expenses?userId=${userId}`
    );
  }

  getDailyAmounts(userId: string | null = null): Observable<DailyAmount[]> {
    return this.http.get<DailyAmount[]>(
      `${this.url}/expense/daily-amounts?userId=${userId}`
    );
  }

  getCategoricalAmounts(
    userId: string | null = null
  ): Observable<CategoricalAmounts[]> {
    return this.http.get<CategoricalAmounts[]>(
      `${this.url}/expense/categorical-amounts?userId=${userId}`
    );
  }

  getMonthlyInOuts(userId: string | null = null): Observable<MonthlyInOut[]> {
    return this.http.get<MonthlyInOut[]>(
      `${this.url}/expense/in-out-amounts?userId=${userId}`
    );
  }

  getMonthBreakDown(month: string, year: string, userId: string) {
    return this.http.get<CategoricalAmounts[]>(
      `${this.url}/expense/monthly-breakdown?month=${month}&year=${year}&userId=${userId}`
    );
  }

  getUserUpcomingExpenses(
    userId: string | null = null
  ): Observable<UpcomingExpense[]> {
    return this.http.get<UpcomingExpense[]>(
      `${this.url}/user/upcoming-expenses?userId=${userId}`
    );
  }
}
