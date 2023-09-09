import { Component, OnInit } from '@angular/core';
import { ExpensesAuthService } from 'src/app/shared/auth/expenses-auth.service';

@Component({
  selector: 'app-unauthorised',
  templateUrl: './unauthorised.component.html',
  styleUrls: ['./unauthorised.component.scss']
})
export class UnauthorisedComponent implements OnInit {
  constructor(private auth: ExpensesAuthService) {}

  ngOnInit(): void {}

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }
}
