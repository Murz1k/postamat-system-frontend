import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '../common/service/auth/auth.service';
import {SetNewPasswordDto, User} from '../common/model/user.model';
import {UpdateUserPasswordComponent} from './user/update-user-password/update-user-password.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from '../common/service/user.service';
import {MaterialService} from '../common/material.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, AfterViewInit {

  userRole: number;
  spinnerText: string;
  newPassword: SetNewPasswordDto;

  constructor(private spinner: NgxSpinnerService,
              private auth: AuthService,
              private userService: UserService,
              private router: Router,
              public dialog: MatDialog,
              private modal: MatSnackBar,
              private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.userRole = JSON.parse(localStorage.getItem('currentUser')).currentUser.role;
  }

  ngAfterViewInit(): void {
    MaterialService.initAdaptiveMenu();
    MaterialService.initCollapsible();
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#e9e9e9';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  changePassword() {
    this.newPassword = new SetNewPasswordDto();
    const currentUserId = JSON.parse(localStorage.getItem('currentUser')).currentUser.id;
    const updateUserPasswordModalWindow = this.dialog.open(UpdateUserPasswordComponent, {
      width: '45vw',
      data: {
        userId: currentUserId,
        oldPassword: this.newPassword.oldPassword,
        newPassword: this.newPassword.newPassword
      }
    });
    updateUserPasswordModalWindow.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.spinnerText = 'Изменение пароля выбранного пользователя';
        this.spinner.show();
        this.userService.setNewUserPassword(result)
            .subscribe(() => {
              this.modal.open(User.getUserResultMessage('setNewPass'),
                  'Закрыть', {
                    duration: 3000
                  });
              this.spinner.hide();
            }, e => {
              this.modal.open(User.getUserErrorMessage(e, 'setNewPass'),
                  'Закрыть', {
                    duration: 3000
                  });
              this.spinner.hide();
            });
      }
    });
  }


}
