import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  dropDownValue: string = 'Select granularity';
  hideGranularityDropDown = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('history')) {
      this.hideGranularityDropDown = true;
    }
  }

  onGranularitySelection(granularity: string): void {
    this.dropDownValue = granularity;
    this.newDropDownValue.emit(this.dropDownValue);
  }
}
