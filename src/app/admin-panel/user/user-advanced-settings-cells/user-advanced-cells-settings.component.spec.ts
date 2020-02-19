import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdvancedSettingsComponent } from './user-advanced-cells-settings.component';

describe('UserAdvancedSettingsComponent', () => {
  let component: UserAdvancedSettingsComponent;
  let fixture: ComponentFixture<UserAdvancedSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdvancedSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdvancedSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
