import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {RestService} from './rest.service';

import {AuthorizedPostomatsDto, CellsOperationsAuthorizationDto, SetNewPasswordDto, User, UserRegistration} from '../model/user.model';

@Injectable()
export class UserService extends RestService {

  readonly UserUri: string = 'Users';

  constructor(public http: HttpClient) {
    super(http);
  }

  /**
   * Метод получения пользователей
   * @returns [{Observable}]
   */
  getUsers(): Observable<User[]> {
    return this.getMethod<User[]>(`${this.UserUri}`);
  }

  /**
   * Метод добавления пользователей
   * @param user - UserRegistration. Информация о пользователе
   * @returns [{Observable}]
   */
  addUser(user: UserRegistration): Observable<User> {
    return this.postMethod<User>(`${this.UserUri}/Add`, user);
  }

  /**
   * Метод обновления информации о пользователе
   * @param user - UserRegistration. Информация о пользователе
   * @returns [{Observable}]
   */
  updateUser(user: UserRegistration): Observable<User> {
    return this.postMethod<User>(`${this.UserUri}/UpdateUser`, user);
  }

  /**
   * Метод обновления пароля пользователя
   * @param passwords - SetNewPasswordDto. Связка старого и нового пароля для пользователя
   * @returns [{Observable}]
   */
  setNewUserPassword(passwords: SetNewPasswordDto): Observable<User> {
    return this.postMethod<User>(`${this.UserUri}/SetNewPassword`, passwords);
  }

    /**
     * Метод сброса пароля и автоматической генерации нового
     * @param userId - string. Гуид пользователя, которому необходимо сгенерировать новый пароль
     */
  resetUserPassword(userId: string): Observable<{value: string}> {
    return this.postMethod<{value: string}>(`${this.UserUri}/ResetPassword=${userId}`);
  }

  /**
   * Метод удаления пользователя
   * @param id - string. Гуид пользователя
   * @returns [{Observable}]
   */
  deleteUserById(id: string): Observable<User> {
    return this.deleteMethod<User>(this.UserUri, id);
  }

  getUserPostamatAuthById(userId: string): Observable<CellsOperationsAuthorizationDto> {
    return this.getMethod<CellsOperationsAuthorizationDto>(`${this.UserUri}/CellsAuth=${userId}`);
  }

  getUserPostamatAuthByToken(): Observable<CellsOperationsAuthorizationDto> {
    return this.getMethod<CellsOperationsAuthorizationDto>(`${this.UserUri}/CellsAuth`);
  }

  updateUserPostamatAuth(postamatsList: AuthorizedPostomatsDto): Observable<any> {
    return this.postMethod<any>(`${this.UserUri}/PostomatsAuth`, postamatsList);
  }

  updateUserCellsAuth(userId: string, cellsAuthInfo: CellsOperationsAuthorizationDto): Observable<any> {
    return this.postMethod<any>(`${this.UserUri}/CellsAuth=${userId}`, cellsAuthInfo);
  }
}
