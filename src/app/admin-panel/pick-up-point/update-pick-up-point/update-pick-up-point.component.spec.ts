import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePickUpPointComponent } from './update-pick-up-point.component';

describe('UpdatePickUpPointComponent', () => {
  let component: UpdatePickUpPointComponent;
  let fixture: ComponentFixture<UpdatePickUpPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePickUpPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePickUpPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
