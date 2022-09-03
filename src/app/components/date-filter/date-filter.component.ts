import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import {
  NgbDate,
  NgbCalendar,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class DateFilterComponent implements OnInit {
  faCalender = faCalendarDays;
  model: string | NgbDateStruct;

  @Input() labelName = '';

  @Output() newDate = new EventEmitter<NgbDate | null>();

  constructor(private calender: NgbCalendar) {}

  ngOnInit(): void {}

  selectedDate(newDate: NgbDate): void {
    this.newDate.emit(newDate);
  }

  clearDateField(): void {
    this.model = ' ';
  }
}
