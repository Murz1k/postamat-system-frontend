import {AfterViewInit, Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {UserRegistration, UserRoles} from '../../../common/model/user.model';
import {MaterialService} from '../../../common/material.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements AfterViewInit {

  constructor(
      public addUserModalWindow: MatDialogRef<AddUserComponent>,
      @Inject(MAT_DIALOG_DATA) public data: UserRegistration) {}

  public userRoles: UserRoles[] = UserRoles.getUserRolesDescription();

  ngAfterViewInit(): void {
    MaterialService.selectsForm();
  }

  onNoClick(): void {
    this.addUserModalWindow.close();
  }
}
