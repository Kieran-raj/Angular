import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit {
  @Input()
  public filterGroup!: FormGroup;
  @Input()
  public dropDownValues: string[] = [];

  @Output() newDropDownValue = new EventEmitter<string>();
  dropDownValue: string = '';

  constructor() {}

  ngOnInit(): void {}

  onChange(event: any): void {
    this.dropDownValue = event.target.value;
    this.newDropDownValue.emit(this.dropDownValue);
  }
}
