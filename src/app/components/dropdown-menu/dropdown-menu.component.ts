import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  @Input()
  public dropDownValues: string[] = [];
  @Input()
  public dropDownValue: string;

  @Output() newDropDownValue = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onGranularitySelection(granularity: string): void {
    this.dropDownValue = granularity;
    this.newDropDownValue.emit(this.dropDownValue);
  }
}
