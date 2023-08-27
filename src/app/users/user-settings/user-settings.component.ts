import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faBell, faLock, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import { DeleteAccountModalComponent } from '../delete-account-modal/delete-account-modal.component';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
  encapsulation: ViewEncapsulation.None
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
      path: 'profile'
    },
    {
      displayText: 'Notification Settings',
      customCssClass: 'item-text',
      icon: faBell,
      path: 'notifications'
    },
    {
      displayText: 'Password',
      customCssClass: 'item-text',
      icon: faLock,
      path: 'password'
    }
  ];

  public pageTitle = 'Settings';

  private deleteAccountDialogInstance: MatDialogRef<DeleteAccountModalComponent> | null;

  constructor(
    private router: Router,
    private dialogSerive: MatDialog
  ) {}

  ngOnInit(): void {}

  public navigate(path: string) {
    this.router.navigate([path]);
  }

  public getRoute(): string {
    return this.router.url;
  }

  public openDeleteDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '30rem';

    this.deleteAccountDialogInstance = this.dialogSerive.open(
      DeleteAccountModalComponent,
      dialogConfig
    );
  }
}
