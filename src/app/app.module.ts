import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

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
import { transactionsReducer } from './shared/data-state/reducers/transactions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TransactionsEffect } from './shared/data-state/effects/transactions.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ExpensesSideBarComponent } from './expenses/expenses-side-bar/expenses-side-bar.component';
import { GridComponent } from './components/grid/grid.component';
import { ChartHelper } from './shared/helper-functions/chart-functions';
import { ExpensesGridComponent } from './expenses/expenses-grid/expenses-grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { PieGridChartComponent } from './components/pie-grid-chart/pie-grid-chart.component';
import { UpdatesEffect } from './shared/data-state/effects/updates.effect';
import { updatesReducer } from './shared/data-state/reducers/updates.reducer';
import { GridActionsComponent } from './components/grid-actions/grid-actions.component';
import { ExpensesLineChartTooltipComponent } from './expenses/line-chart-tooltip/expenses-line-chart-tooltip.component';
import { ExpensesCreateModalComponent } from './expenses/expenses-create-modal/expenses-create-modal.component';
import { AuthInterceptor } from './shared/auth/auth.interceptor';
import { userReducer } from './shared/data-state/reducers/user.reducer';
import { UserEffect } from './shared/data-state/effects/user.effect';
import { NetFlowBarChartComponent } from './expenses/net-flow-bar-chart/net-flow-bar-chart.component';
import { NetFlowModalComponent } from './expenses/net-flow-modal/net-flow-modal.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { categoryReducer } from './shared/data-state/reducers/category.reducer';
import { CategoryEffect } from './shared/data-state/effects/category.effect';
import { UserSettingsComponent } from './users/user-settings/user-settings.component';
import { ProfileSettingsComponent } from './users/user-settings/profile-settings/profile-settings.component';

import { NotificationSettingsComponent } from './users/user-settings/notification-settings/notification-settings.component';
import { BuinessRuleContext } from './shared/business-rules/business-rule-context';
import { ProfileSettingsBusinessRule } from './shared/business-rules/rules/ProfileSettingsBusinessRule';
import { DeleteAccountModalComponent } from './users/delete-account-modal/delete-account-modal.component';
import { ChartDropDownComponent } from './expenses/chart-drop-down/chart-drop-down.component';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { UnauthorisedComponent } from './components/unauthorised/unauthorised.component';
import { UpcomingGridComponent } from './expenses/upcoming-grid/upcoming-grid.component';
import { CreateDeleteModalComponent } from './expenses/upcoming-grid/create-delete-modal/create-delete-modal.component';

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
    PieGridChartComponent,
    GridActionsComponent,
    ExpensesLineChartTooltipComponent,
    ExpensesCreateModalComponent,
    NetFlowBarChartComponent,
    NetFlowModalComponent,
    PieChartComponent,
    UserSettingsComponent,
    ProfileSettingsComponent,
    NotificationSettingsComponent,
    DeleteAccountModalComponent,
    ChartDropDownComponent,
    UnauthorisedComponent,
    CreateDeleteModalComponent,
    UpcomingGridComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: environment.domain,
      clientId: environment.clientId,
      authorizationParams: {
        audience: environment.audience,
        redirect_uri: window.location.origin
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'unauthorised', component: UnauthorisedComponent },
      {
        path: 'home',
        component: HomePageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'expenses',
        component: ExpensesComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user/:username',
        component: UserSettingsComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'profile',
            component: ProfileSettingsComponent
          },
          {
            path: 'notifications',
            component: NotificationSettingsComponent
          }
        ]
      }
    ]),
    BrowserAnimationsModule,
    NgbModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    NgxChartsModule,
    FontAwesomeModule,
    StoreModule.forRoot({
      transactions: transactionsReducer,
      category: categoryReducer,
      updates: updatesReducer,
      user: userReducer
    }),
    StoreDevtoolsModule.instrument({
      name: 'Personal Project - State',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      TransactionsEffect,
      CategoryEffect,
      UpdatesEffect,
      UserEffect
    ])
  ],
  providers: [
    ChartHelper,
    AuthGuard,
    BuinessRuleContext,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'BASE_API_URL', useValue: environment.baseUrl }
  ],
  bootstrap: [AppComponent],
  exports: [ExpensesSideBarComponent, BrowserAnimationsModule]
})
export class AppModule {
  constructor(private buinessRuleContext: BuinessRuleContext) {
    this.buinessRuleContext.registerRule(new ProfileSettingsBusinessRule());
  }
}
