import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { RestService } from '../rest.service';

import { Login, TokenDto } from '../../model/token.model';

@Injectable(
    { providedIn: 'root' }
)
export class AuthService extends RestService {

  private currentUserSubject: BehaviorSubject<TokenDto>;
  public currentUser: Observable<TokenDto>;

  constructor(public http: HttpClient) {
    super(http);
    this.currentUserSubject = new BehaviorSubject<TokenDto>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): TokenDto {
    return this.currentUserSubject.value;
  }

  login(login: Login): Observable<TokenDto> {
    return this.postMethodWithoutToken<TokenDto>('Token', login)
        .pipe(map(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
