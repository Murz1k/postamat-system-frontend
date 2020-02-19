import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMessageTemplateDialogComponent } from './delete-message-template-dialog.component';

describe('DeleteOrderDialogComponent', () => {
  let component: DeleteMessageTemplateDialogComponent;
  let fixture: ComponentFixture<DeleteMessageTemplateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMessageTemplateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMessageTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
