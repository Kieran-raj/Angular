import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit {
  /**
   * Tooltip string.
   * @type {string}
   */
  @Input()
  public toolTipTitle: string;

  /**
   * Drop down values.
   * @type {string[]}
   */
  @Input()
  public dropDownValues: string[] = [];

  /**
   * Drop down value.
   * @type {string}
   */
  @Input()
  public dropDownValue: string;

  /**
   * New drop down value
   * @type {EventEmitter<string>}
   */
  @Output() newDropDownValue = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onGranularitySelection(granularity: string): void {
    this.dropDownValue = granularity;
    this.newDropDownValue.emit(this.dropDownValue);
  }
}
