/**
 * Сервис для реализации однотипных Generic запросов к REST API
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

import {TokenDto} from '../model/token.model';

@Injectable()
export class RestService {

  get token(): TokenDto {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  get httpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token.jwt
      })
    };
  }

  constructor(public http: HttpClient) {
  }

  /**
   * Метод GET запроса к REST API
   * @param topicName - string. URL для запроса к REST API
   * @return [{Observable}] Generic type
   */
  public getMethod<T>(topicName: string): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}/api/${topicName}`, this.httpOptions);
  }

  /**
   * Метод POST запроса к REST API
   * @param topicName - string. URL для запроса к REST API
   * @param data - any = {}. Тело запроса
   * @return [{Observable}] Generic type
   */
  public postMethod<T>(topicName: string, data: any = {}): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/api/${topicName}`, data, this.httpOptions);
  }

  /**
   * Метод POST запроса к REST API
   * без Bearer токена
   * @param topicName - string. URL для запроса к REST API
   * @param data - any = {}. Тело запроса
   * @return [{Observable}] Generic type
   */
  public postMethodWithoutToken<T>(topicName: string, data: any = {}): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}/api/${topicName}`, data);
  }

  /**
   * Метод PUT запроса к REST API
   * @param topicName - string. URL для запроса к REST API
   * @param data - any = {}. Тело запроса
   * @return [{Observable}] Generic type
   */
  public putMethod<T>(topicName: string, data: any = {}): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}/api/${topicName}`, data, this.httpOptions);
  }

  /**
   * Метод DELETE запроса к REST API
   * @param topicName - string. URL для запроса к REST API
   * @param id - string. ID для удаления
   * @return [{Observable}] Generic type
   */
  public deleteMethod<T>(topicName: string, id: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}/api/${topicName}/${id}`, this.httpOptions);
  }
}
