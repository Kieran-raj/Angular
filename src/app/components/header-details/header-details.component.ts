import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-details',
  templateUrl: './header-details.component.html',
  styleUrls: ['./header-details.component.scss'],
})
export class HeaderDetailsComponent implements OnInit {
  @Input() pageTitle: string = '';

  constructor() {}

  ngOnInit(): void {}
}
