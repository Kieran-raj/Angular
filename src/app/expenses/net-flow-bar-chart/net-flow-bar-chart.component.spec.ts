import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetFlowBarChartComponent } from './net-flow-bar-chart.component';

describe('NetFlowBarChartComponent', () => {
  let component: NetFlowBarChartComponent;
  let fixture: ComponentFixture<NetFlowBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetFlowBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetFlowBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
