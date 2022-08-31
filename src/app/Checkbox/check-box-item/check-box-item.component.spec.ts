import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxItemComponent } from './check-box-item.component';

describe('CheckBoxItemComponent', () => {
  let component: CheckBoxItemComponent;
  let fixture: ComponentFixture<CheckBoxItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBoxItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckBoxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
