import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeleteModalComponent } from './create-delete-modal.component';

describe('CreateDeleteModalComponent', () => {
  let component: CreateDeleteModalComponent;
  let fixture: ComponentFixture<CreateDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDeleteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
