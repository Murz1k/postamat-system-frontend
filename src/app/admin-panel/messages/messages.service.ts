import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, throwError} from 'rxjs';
import {SentMessage} from './_models/sent-message';
import {catchError, map, tap} from 'rxjs/operators';
import {NotificationServiceConfig} from './_models/notification-service-config';
import {MatSnackBar} from '@angular/material';
import {DatePipe} from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class MessagesService {

    fieldNames = {
        id: 'id',
        messageId: 'Идентификатор сообщения на сервисе',
        phoneNumber: 'Телефон отправки',
        message: 'Текст сообщения',
        sendResult: 'Статус отправки сообщения на сервис',
        status: 'Статус сообщения',
        registeredTimestamp: 'Время регистрации сообщения в очередь на отправку',
        sendingTimeStamp: 'Время отправки сообщения в сервис',
        lastChangeStatusTimestamp: 'Время последнего изменения статуса',
        registeredTimestampJsTicks: 'Время регистрации сообщения в очередь на',
        sendingTimeStampJsTicks: 'Время отправки сообщения в сервис',
        lastChangeStatusTimestampJsTicks: 'Время регистрации сообщения в очередь на отправку',
    };

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    }

    getMessages(fromJsTicks?: number, toJsTicks?: number): Observable<SentMessage[]> {
        return this.http.get<SentMessage[]>(`${environment.apiUrl}/api/ClientsNotifications/from=${fromJsTicks}&to=${toJsTicks}`).pipe(
            map(orders => orders ? orders : []));
    }

    getQueueMessages(): Observable<SentMessage[]> {
        return this.http.get<SentMessage[]>(`${environment.apiUrl}/api/ClientsNotifications`).pipe(
            map(orders => orders ? orders : []));
    }

    updateNotificationsSettings(settings: NotificationServiceConfig): Observable<NotificationServiceConfig> {
        return this.http.put<NotificationServiceConfig>(`${environment.apiUrl}/api/ClientsNotificationsSettings`, settings).pipe(
            tap(() => this.snackBar.open(`Настройки уведомлений обновлены.`, undefined, {
                    duration: 7000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                }),
            ));
    }

    getNotificationsSettings(): Observable<NotificationServiceConfig> {
        return this.http.get<NotificationServiceConfig>(`${environment.apiUrl}/api/ClientsNotificationsSettings`);
    }
}
