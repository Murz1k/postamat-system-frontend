import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {SetNewPasswordDto} from '../../../common/model/user.model';

@Component({
  selector: 'app-update-user-password',
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.scss']
})
export class UpdateUserPasswordComponent {

  constructor(public updateUserPasswordModalWindow: MatDialogRef<UpdateUserPasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SetNewPasswordDto) {
  }

  onClose() {
    this.updateUserPasswordModalWindow.close();
  }

}
