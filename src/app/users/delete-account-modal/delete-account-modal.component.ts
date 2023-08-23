import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  IconDefinition,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-account-modal',
  templateUrl: './delete-account-modal.component.html',
  styleUrls: ['./delete-account-modal.component.scss']
})
export class DeleteAccountModalComponent implements OnInit {
  /**
   * Warning triangle
   * @type {IconDefinition}
   */
  faInfoTriangle = faTriangleExclamation;

  /**
   * Form Group
   * @type {FormGroup}
   */
  public formGroup = new FormGroup({
    userName: new FormControl('')
  });

  constructor(
    private dialogInstance: MatDialogRef<DeleteAccountModalComponent>
  ) {}

  ngOnInit(): void {
    this.dialogInstance.addPanelClass('delete-dialog');
  }

  public onDelete() {}

  public onClose() {
    this.dialogInstance.close();
  }

  ngOnDestroy(): void {}
}
