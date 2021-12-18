import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullDataHistoryComponent } from './full-data-history.component';

describe('FullDataHistoryComponent', () => {
  let component: FullDataHistoryComponent;
  let fixture: ComponentFixture<FullDataHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullDataHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullDataHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
