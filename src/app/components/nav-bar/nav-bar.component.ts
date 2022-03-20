import { Component, Input, OnInit } from '@angular/core';
import {
  faArrowTrendUp,
  faCoins,
  faHouse,
  faLandmark,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input()
  hideHomeLink: boolean = false;
  navLinkClass: string = '';
  faLandmark = faLandmark;
  faUser = faUser;
  faArrow = faArrowTrendUp;
  faHouse = faHouse;
  faCoins = faCoins;

  constructor() {}

  ngOnInit(): void {
    if (this.hideHomeLink) {
      this.navLinkClass = 'hideHomeLink';
    }
  }
}
