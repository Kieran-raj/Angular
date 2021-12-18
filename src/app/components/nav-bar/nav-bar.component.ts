import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Input()
  hideHomeLink: boolean = false
  navLinkClass: string = ''

  constructor() { }

  ngOnInit(): void {
    if (this.hideHomeLink) {
      this.navLinkClass = 'hideHomeLink'
    }
  }

}
