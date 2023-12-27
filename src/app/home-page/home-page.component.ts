import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  /**
   * Page title
   * @type {string}
   */
  pageTitle: string = 'Home';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
