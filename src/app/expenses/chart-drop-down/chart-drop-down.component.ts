import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { UpdateState } from '../data-state/states/update.state';
import { Store } from '@ngrx/store';
import { addModalAction } from '../data-state/actions/updates.action';

@Component({
  selector: 'app-chart-drop-down',
  templateUrl: './chart-drop-down.component.html',
  styleUrls: ['./chart-drop-down.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartDropDownComponent implements OnInit {
  @Output()
  public resetGraph = new EventEmitter();

  constructor(private updateStore: Store<UpdateState>) {}

  ngOnInit(): void {}

  public setModalAction(action: string) {
    this.updateStore.dispatch(addModalAction({ action: action }));
  }

  public emitResetGraph() {
    this.resetGraph.emit();
  }
}
