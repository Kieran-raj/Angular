import { Component, OnInit } from '@angular/core';
import {
  faPenToSquare,
  faTrashCan,
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-actions',
  templateUrl: './grid-actions.component.html',
  styleUrls: ['./grid-actions.component.scss'],
})
export class GridActionsComponent implements ICellRendererAngularComp {
  editButtonIcon: IconDefinition = faPenToSquare;
  editButtonIconTooltip: string = 'Edit Record';
  deleteButtonIcon: IconDefinition = faTrashCan;
  deleteButtonIconTooltip: string = 'Delete Record';

  agInit(params: ICellRendererParams<any, any>): void {}

  refresh(params: ICellRendererParams<any, any>): boolean {
    return false;
  }

  buttonClicked() {
    alert(`Actions!`);
  }
}
