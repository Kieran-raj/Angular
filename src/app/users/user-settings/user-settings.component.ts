import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { faBell, faLock, faUser, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserSettingsComponent implements OnInit {
  /**
   * Icon
   */
  faX = faX;

  buttons = [
    {
      displayText: 'Profile Settings',
      customCssClass: 'item-text',
      icon: faUser,
      path: 'profile',
    },
    {
      displayText: 'Notification Settings',
      customCssClass: 'item-text',
      icon: faBell,
      path: 'notifications',
    },
    {
      displayText: 'Password',
      customCssClass: 'item-text',
      icon: faLock,
      path: 'password',
    },
  ];

  public pageTitle = 'Settings';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public navigate(path: string) {
    this.router.navigate([path]);
  }

  public getRoute(): string {
    return this.router.url;
  }
}
