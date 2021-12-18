import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss']
})
export class DateFilterComponent implements OnInit {
  @Input()
  isDaily: boolean = true
  @Input()
  isMonthly: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
