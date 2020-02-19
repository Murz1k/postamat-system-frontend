import '../../polyfills';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DemoMaterialModule } from '../common/material-module';
import { MatNativeDateModule } from '@angular/material';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import { UserService } from '../common/service/user.service';
import { PickUpPointService } from '../common/service/pick-up-point.service';
import { CellService } from '../common/service/cell.service';

import { AdminPanelComponent } from './admin-panel.component';
import { HomeComponent } from './home/home.component';
import { PickUpPointComponent } from './pick-up-point/pick-up-point.component';
import { AddPickUpPointComponent } from './pick-up-point/add-pick-up-point/add-pick-up-point.component';
import { UpdatePickUpPointComponent } from './pick-up-point/update-pick-up-point/update-pick-up-point.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UpdateUserPasswordComponent } from './user/update-user-password/update-user-password.component';
import { CellComponent } from './pick-up-point/cell/cell.component';
import {UserAdvancedCellsSettingsComponent} from './user/user-advanced-settings-cells/user-advanced-cells-settings.component';
import { UserAdvancedSettingsPostamatsComponent } from './user/user-advanced-settings-postamats/user-advanced-settings-postamats.component';
import { CellsComponent } from './cells/cells.component';
import {LoaderComponent} from '../common/components/loader/loader.component';

@NgModule({
  declarations: [
    HomeComponent,
    AdminPanelComponent,
    PickUpPointComponent,
    CellComponent,
    UserComponent,
    AddUserComponent,
    UpdateUserComponent,
    AddPickUpPointComponent,
    UpdatePickUpPointComponent,
    UpdateUserPasswordComponent,
    UserAdvancedCellsSettingsComponent,
    UserAdvancedSettingsPostamatsComponent,
    CellsComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AdminPanelRoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    UserService,
    PickUpPointService,
    CellService,
  ],
  exports: [
    AddUserComponent,
    UpdateUserComponent,
    UpdateUserPasswordComponent,
    AddPickUpPointComponent,
    UpdatePickUpPointComponent,
    UserAdvancedCellsSettingsComponent,
    UserAdvancedSettingsPostamatsComponent
  ],
  entryComponents: [
    AddUserComponent,
    UpdateUserComponent,
    UpdateUserPasswordComponent,
    AddPickUpPointComponent,
    UpdatePickUpPointComponent,
    UserAdvancedCellsSettingsComponent,
    UserAdvancedSettingsPostamatsComponent
  ],
})
export class AdminPanelModule { }
