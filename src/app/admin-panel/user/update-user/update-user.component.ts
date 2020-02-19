import {AfterViewInit, Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User, UserRoles} from '../../../common/model/user.model';
import {MaterialService} from '../../../common/material.service';

@Component({
    selector: 'app-change-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements AfterViewInit {

    constructor(public addUserModalWindow: MatDialogRef<UpdateUserComponent>,
                @Inject(MAT_DIALOG_DATA) public data: User) {
    }

    public userRoles: UserRoles[] = UserRoles.getUserRolesDescription();

    ngAfterViewInit(): void {
        MaterialService.selectsForm();
        setTimeout(() => {
            MaterialService.updateTextInputs();
        }, 100);

    }

    onNoClick(): void {
        this.addUserModalWindow.close();
    }

}
