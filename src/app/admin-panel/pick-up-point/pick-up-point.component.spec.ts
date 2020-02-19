import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUpPointComponent } from './pick-up-point.component';

describe('PostamatsComponent', () => {
  let component: PickUpPointComponent;
  let fixture: ComponentFixture<PickUpPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickUpPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUpPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
