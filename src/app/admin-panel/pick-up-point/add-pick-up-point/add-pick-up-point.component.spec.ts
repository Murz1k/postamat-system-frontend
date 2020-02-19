import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPickUpPointComponent } from './add-pick-up-point.component';

describe('AddPickUpPointComponent', () => {
  let component: AddPickUpPointComponent;
  let fixture: ComponentFixture<AddPickUpPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPickUpPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPickUpPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
