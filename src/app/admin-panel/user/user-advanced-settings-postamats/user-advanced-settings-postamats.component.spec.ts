import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdvancedSettingsPostamatsComponent } from './user-advanced-settings-postamats.component';

describe('UserAdvancedSettingsPostamatsComponent', () => {
  let component: UserAdvancedSettingsPostamatsComponent;
  let fixture: ComponentFixture<UserAdvancedSettingsPostamatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdvancedSettingsPostamatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdvancedSettingsPostamatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
