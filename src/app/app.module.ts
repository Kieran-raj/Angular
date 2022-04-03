import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { HeaderDetailsComponent } from './components/header-details/header-details.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FullDataHistoryComponent } from './expenses/full-data-history/full-data-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store, StoreModule } from '@ngrx/store';
import { transactionsReducer } from './expenses/date-state/reducers/transactions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TransactionsEffect } from './expenses/date-state/effects/transactions.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ExpensesComponent,
    HeaderDetailsComponent,
    NavBarComponent,
    FullDataHistoryComponent,
    DropdownMenuComponent,
    LineChartComponent,
    BarChartComponent,
    DateFilterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomePageComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'expenses/history', component: FullDataHistoryComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    NgbModule,
    NgxChartsModule,
    FontAwesomeModule,
    StoreModule.forRoot({ transactions: transactionsReducer }),
    StoreDevtoolsModule.instrument({
      name: 'Personal Project - State',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([TransactionsEffect]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
