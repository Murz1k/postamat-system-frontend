import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTemplatesListComponent } from './message-templates-list.component';

describe('MessageTemplatesListComponent', () => {
  let component: MessageTemplatesListComponent;
  let fixture: ComponentFixture<MessageTemplatesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageTemplatesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageTemplatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
