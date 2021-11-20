import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ExpensesComponent } from '../../expenses/expenses.component'

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements OnInit {
  @Input()
  public filterGroup!: FormGroup;
  @Input()
  public dropDownValues: string[] = []

  constructor() {}

  ngOnInit(): void {}
}
