import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { HeaderDetailsComponent } from './components/header-details/header-details.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DateFilterComponent } from './components/date-filter/date-filter.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { transactionsReducer } from './expenses/data-state/reducers/transactions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TransactionsEffect } from './expenses/data-state/effects/transactions.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ExpensesSideBarComponent } from './expenses/expenses-side-bar/expenses-side-bar.component';
import { GridComponent } from './components/grid/grid.component';
import { ChartHelper } from './shared/helper-functions/chart-functions';
import { ExpensesGridComponent } from './expenses/expenses-grid/expenses-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { UpdatesEffect } from './expenses/data-state/effects/updates.effect';
import { updatesReducer } from './expenses/data-state/reducers/updates.reducer';
import { GridActionsComponent } from './components/grid-actions/grid-actions.component';
import { ExpensesLineChartTooltipComponent } from './expenses/line-chart-tooltip/expenses-line-chart-tooltip.component';
import { ExpensesCreateModalComponent } from './expenses/expenses-create-modal/expenses-create-modal.component';
import { AuthService } from './shared/auth/auth.service';
import { AuthGuard } from './shared/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { userReducer } from './expenses/data-state/reducers/user.reducer';
import { UserEffect } from './expenses/data-state/effects/user.effect';
import { NetFlowBarChartComponent } from './expenses/net-flow-bar-chart/net-flow-bar-chart.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ExpensesComponent,
    HeaderDetailsComponent,
    NavBarComponent,
    DropdownMenuComponent,
    LineChartComponent,
    BarChartComponent,
    DateFilterComponent,
    ExpensesSideBarComponent,
    GridComponent,
    ExpensesGridComponent,
    PieChartComponent,
    GridActionsComponent,
    ExpensesLineChartTooltipComponent,
    ExpensesCreateModalComponent,
    LoginComponent,
    NetFlowBarChartComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      {
        path: 'expenses',
        component: ExpensesComponent,
        canActivate: [AuthGuard],
      },
    ]),
    BrowserAnimationsModule,
    NgbModule,
    NgxChartsModule,
    FontAwesomeModule,
    StoreModule.forRoot({
      transactions: transactionsReducer,
      updates: updatesReducer,
      user: userReducer,
    }),
    StoreDevtoolsModule.instrument({
      name: 'Personal Project - State',
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([TransactionsEffect, UpdatesEffect, UserEffect]),
  ],
  providers: [
    ChartHelper,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'BASE_API_URL', useValue: 'https://localhost:7271' },
  ],
  bootstrap: [AppComponent],
  exports: [ExpensesSideBarComponent],
})
export class AppModule {}
