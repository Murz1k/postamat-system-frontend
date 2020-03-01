import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {NotificationTemplateDto} from './_models/notification-template-dto';
import {catchError, map, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {NotificationStatus} from '../messages/_models/notification-status';

@Injectable({
    providedIn: 'root',
})
export class ClientNotificationService {

    fieldNames = {
        id: 'id',
        message: 'Шаблон уведомления',
        description: 'Описание шаблона',
        status: 'Статус ячейки, при котором производится отправка уведомления',
    };

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    }

    getStatusDictionary(): { label: string, value: NotificationStatus }[] {
        return [
            {value: NotificationStatus.Delivered, label: 'Доставлено'},
            {value: NotificationStatus.Read, label: 'Прочитано'},
            {value: NotificationStatus.Expired, label: 'Просрочено'},
            {value: NotificationStatus.LinkClicked, label: 'Клик по ссылке'},
            {value: NotificationStatus.UnableToDeliver, label: 'Нельзя доставить'},
            {value: NotificationStatus.WrongNumber, label: 'Неправильный номер'},
            {value: NotificationStatus.NotEnoughtMoney, label: 'Не хватает денег'},
            {value: NotificationStatus.NotRequested, label: 'Не запрошен'},
            {value: NotificationStatus.NotFound, label: 'Не найден'},
            {value: NotificationStatus.Stopped, label: 'Остановлен'},
            {value: NotificationStatus.WaitToSent, label: 'Ожидает отправки'},
            {value: NotificationStatus.TransferedToOperator, label: 'Передача оператору'},
            {value: NotificationStatus.Prohibited, label: 'Запрещено'},
            {value: NotificationStatus.InaccessibleNumber, label: 'Номер недоступен'}
            ];
    }

    getMessageTemplates(): Observable<NotificationTemplateDto[]> {
        return this.http.get<NotificationTemplateDto[]>(`${environment.apiUrl}/api/ClientsNotificationsTemplates`).pipe(
            map(orders => orders ? orders : []));
    }

    deleteTemplate(template: NotificationTemplateDto) {
        return this.http.delete(`${environment.apiUrl}/api/ClientsNotificationsTemplates/${template.id}`).pipe(
            tap(() => this.snackBar.open(`Шаблон № ${template.description} удален.`, undefined, {
                    duration: 7000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                }),
            ),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 404) {
                        this.snackBar.open(`Шаблон № ${template.description} не найден или уже удален.`, undefined, {
                            duration: 30000,
                            verticalPosition: 'top',
                            horizontalPosition: 'right',
                        });
                    }
                }
                return throwError(err);
            }));
    }

    createTemplate(order: NotificationTemplateDto) {
        return this.http.post<NotificationTemplateDto>(`${environment.apiUrl}/api/ClientsNotificationsTemplates`, order).pipe(
            tap((result) => {
                this.snackBar.open(`Шаблон № ${result.description} добавлен.`, undefined, {
                    duration: 7000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                });
            }),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    this.snackBar.open(Object.keys(err.error).map(key => err.error[key]).join('\n'), undefined, {
                        duration: 30000,
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                    });
                }
                return of(err);
            }));
    }

    updateTemplate(order: NotificationTemplateDto) {
        return this.http.put<NotificationTemplateDto>(`${environment.apiUrl}/api/ClientsNotificationsTemplates`, order).pipe(
            tap((result) => this.snackBar.open(`Шаблон № ${result.description} обновлен.`, undefined, {
                duration: 7000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
            })),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    this.snackBar.open(Object.keys(err.error).map(key => err.error[key]).join('\n'), undefined, {
                        duration: 30000,
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                    });
                }
                return of(err);
            }));
    }
}
