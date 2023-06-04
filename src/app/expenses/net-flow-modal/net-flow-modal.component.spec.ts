import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetFlowModalComponent } from './net-flow-modal.component';

describe('NetFlowModalComponent', () => {
  let component: NetFlowModalComponent;
  let fixture: ComponentFixture<NetFlowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetFlowModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetFlowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
