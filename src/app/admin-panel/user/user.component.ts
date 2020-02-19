import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material';
import {Subscription} from 'rxjs';

import {SetNewPasswordDto, User, UserRegistration, UserRoles} from '../../common/model/user.model';
import {PickUpPointAccessDto} from '../../common/model/pick-up-point.model';

import {UserService} from '../../common/service/user.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {PickUpPointService} from '../../common/service/pick-up-point.service';

import {AddUserComponent} from './add-user/add-user.component';
import {UpdateUserComponent} from './update-user/update-user.component';
import {UserAdvancedCellsSettingsComponent} from './user-advanced-settings-cells/user-advanced-cells-settings.component';
import {UserAdvancedSettingsPostamatsComponent} from './user-advanced-settings-postamats/user-advanced-settings-postamats.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  spinnerText: string;
  public users: User[];
  public users$: Subscription;
  public newUser: UserRegistration;
  public changeUser: User;
  public newUserPassword: SetNewPasswordDto;
  public userRoles: UserRoles[] = UserRoles.getUserRolesDescription();
  private postamatsData: PickUpPointAccessDto[] = [];

  constructor(private spinner: NgxSpinnerService,
              private userService: UserService,
              private postamatsService: PickUpPointService,
              public dialog: MatDialog,
              private modal: MatSnackBar) {
  }

  /**
   * Метод, стартующий в самом начале загрузки страницы
   * - получаем список пользователей и подписываемся на него
   */
  ngOnInit() {
    this.spinnerText = 'Получение списка пользователей';
    this.spinner.show();
    this.users = new Array<User>();
    this.users$ = this.userService.getUsers()
        .subscribe((res: User[]) => {
          (res === null) ? this.users = [] : this.users = res;
          this.spinner.hide();
        }, e => this.errorUserHandler(e, true));
  }

  /**
   * Метод добавления пользователя
   * с помощью модального окна
   */
  addUser(): void {
    this.newUser = new UserRegistration();
    const addUserModalWindow = this.dialog.open(AddUserComponent, {
      width: '45vw',
      data: {
        name: this.newUser.name,
        password: this.newUser.password,
        role: this.newUser.role,
        description: this.newUser.description
      }
    });

    addUserModalWindow.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.spinnerText = 'Добавление пользователя';
        this.spinner.show();
        this.newUser.id = null;
        this.newUser = result;
        this.userService.addUser(this.newUser)
            .subscribe((user: User) => {
              this.users.push(user);
              this.requestHandler('newUser', true);
            }, e => this.errorUserHandler(e, true, 'newUser'));
      }
    });
  }

  /**
   * Метод обновления информации о пользователе
   * с помощью модального окна
   * @param id - string. Гуид пользователя
   */
  changeSelectedUser(id): void {
    this.changeUser = new User();
    this.users.forEach(el => {
      if (el.id === id) {
        this.changeUser = {
          id: el.id,
          name: el.name,
          role: el.role,
          description: el.description
        };
      }
    });
    const updateUserModalWindow = this.dialog.open(UpdateUserComponent, {
      width: '45vw',
      data: {
        id: this.changeUser.id,
        name: this.changeUser.name,
        role: this.changeUser.role,
        description: this.changeUser.description
      }
    });
    updateUserModalWindow.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.spinnerText = 'Изменение выбранного пользователя';
        this.spinner.show();
        this.userService.updateUser(result)
            .subscribe((res: User) => {
              this.users.forEach((el, i) => {
                if (res.id === el.id) {
                  this.users[i] = res;
                }
              });
              this.requestHandler('updateUser', true);
            }, e => this.errorUserHandler(e, true, 'updateUser'));
      }
    });
  }

  /**
   * Метод обновления пароля пользователя
   * с помощью генерации нового
   * @param user - User. Гуид пользователя
   */
  resetUserPassword(user: User): void {
    if (confirm(`Вы действительно хотите сбросить пароль пользователя '${user.name}'?`)) {
      this.spinnerText = 'Сбрасываем пароль пользователя ${user.name}...';
      this.spinner.show();
      this.userService.resetUserPassword(user.id)
          .subscribe(x => {
            this.modal.open(`Новый пароль сгенерирован: ${x.value}`,
                'Закрыть', {
                  duration: 10000
                });
            this.spinner.hide();
          }, e => this.errorUserHandler(e, true, 'resetUser'));
    }
  }

  /**
   * Метод удаления пользователя
   * с всплывабщим браузерным уведомлением
   * @param user - User. Пользователь
   */
  deleteUser(user: User) {
    if (confirm(`Вы действительно хотите удалить пользователя '${user.name}'?`)) {
      this.spinnerText = `Удаляем пользователя ${user.name}...`;
      this.spinner.show();
      this.userService.deleteUserById(user.id)
          .subscribe(x => {
            this.users.forEach((el, i) => {
              if (el.id === x.id) {
                this.users.splice(i, 1);
              }
            });
            this.requestHandler('deleteUser', true);
          }, e => this.errorUserHandler(e, true, 'deleteUser'));
    }
  }

  /**
   * Метод добавления расширенных пользовательские настроек по ячейкам
   * @param user - User. Пользователь
   */
  async addUserCellsAdvancedSettings(user: User): Promise<void> {
    const cellsAuthParam = await this.userService.getUserPostamatAuthById(user.id).toPromise();
    const advancedSettingsModalWindow = this.dialog.open(UserAdvancedCellsSettingsComponent, {
      width: '45vw',
      data: {
        isAllowAddWaitLoadItems: cellsAuthParam.isAllowAddWaitLoadItems,
        isAllowOpenCell: cellsAuthParam.isAllowOpenCell,
        isAllowReserveForReturn: cellsAuthParam.isAllowReserveForReturn,
        isShowPinCode: cellsAuthParam.isShowPinCode,
      }
    });

    advancedSettingsModalWindow.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.spinnerText = `Изменение прав доступа для ячеек пользователя ${user.name}`;
        this.spinner.show();
        this.userService.updateUserCellsAuth(user.id, result)
            .subscribe(() => {
              this.requestHandler('updateUserCellAuth', true);
            }, e => this.errorUserHandler(e, true));
      }
    });
  }

  /**
   * Метод изменения доступа пользователя к постаматам
   * @param user - User. Пользователь
   */
  async addUserPickUpPointAdvancedSettings(user: User): Promise<void> {
    const postamats = await this.postamatsService.getAllPickUpPoints().toPromise();
    this.postamatsData = [];
    postamats.forEach(el => {
      this.postamatsData.push({
        id: el.id,
        name: el.name,
        isAccess: PickUpPointAccessDto.getPermissionInformation(el.id, user.authorizedPostomats || [])
      });
    });
    const advancedSettingsPostamatsModalWindow = this.dialog.open(UserAdvancedSettingsPostamatsComponent, {
      width: '45vw',
      data: this.postamatsData
    });

    advancedSettingsPostamatsModalWindow.afterClosed().subscribe((result: PickUpPointAccessDto[]) => {
      if (result !== undefined) {
        this.spinnerText = `Изменение саиска разрешенных постаматов для пользователя ${user.name}`;
        this.spinner.show();
        const accessedPostamatsIsxList: Array<string> = [];
        result.forEach(el => {
          if (el.isAccess) {
            accessedPostamatsIsxList.push(el.id);
          }
        });
        this.userService.updateUserPostamatAuth({userId: user.id, postomatGuids: accessedPostamatsIsxList})
            .subscribe(() => {
              const idx = this.users.findIndex(p => p.id === user.id);
              this.users[idx].authorizedPostomats = accessedPostamatsIsxList;
              this.requestHandler('updateUserPostamatAuth', true);
            }, e => this.errorUserHandler(e, true, 'updateUserPostamatAuth'));
      }
    });
  }

  /**
   * Метод для вывода на экран информации о пользователе
   * @param user - User. Пользователь
   */
  getUserRoleDescription(user: User): string {
    const idx = this.userRoles.findIndex(id => id.role === user.role);
    return `${this.userRoles[idx].description} (${this.userRoles[idx].role})`;
  }

  /**
   * Хэндлер для обработки ответа при успешной операции
   * @param method - string. Метод, у которого свой ответ
   * @param isSpinnerHide - boolean. Значение, при котором спиннер останавливается
   */
  requestHandler(method: string, isSpinnerHide?: boolean) {
    const message: string = User.getUserResultMessage(method);
    this.modal.open(message, 'Закрыть', {
      duration: 3000
    });
    if (isSpinnerHide) {
      this.spinner.hide();
    }
  }

  /**
   * Хэндлер ошибок компонента
   * @param reject - any. Сама ошибка
   * @param isSpinnerHide - boolean. Значение, при котором спиннер останавливается
   * @param method - string. Метод, у которого свой набор ошибок
   */
  errorUserHandler(reject, isSpinnerHide?: boolean, method?: string) {
    const message: string = User.getUserErrorMessage(reject);
    this.modal.open(message, 'Закрыть', {
      duration: 3000
    });
    if (isSpinnerHide) {
      this.spinner.hide();
    }
  }

  /**
   * Метод, исполняющийся при уходе со страницы
   * - отписываемся от подписки в ngOnInit
   */
  ngOnDestroy() {
    this.users$.unsubscribe();
  }
}
