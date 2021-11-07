import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ExpensesComponent,
    HeaderDetailsComponent,
    NavBarComponent,
    FullDataHistoryComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
