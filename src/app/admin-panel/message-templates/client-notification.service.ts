import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {NotificationTemplateDto} from './_models/notification-template-dto';
import {catchError, map, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

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

    getMessageTemplates(): Observable<NotificationTemplateDto[]> {
        return this.http.get<NotificationTemplateDto[]>(`${environment.apiUrl}/api/ClientsNotificationsTemplates`).pipe(
            map(orders => orders ? orders : []));
    }

    deleteTemplate(id: string) {
        return this.http.delete(`${environment.apiUrl}/api/ClientsNotificationsTemplates/${id}`).pipe(
            tap(() => this.snackBar.open(`Шаблон № ${id} удален.`, undefined, {
                    duration: 7000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                }),
            ),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 404) {
                        this.snackBar.open(`Шаблон № ${id} не найден или уже удален.`, undefined, {
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
                this.snackBar.open(`Шаблон № ${result.id} добавлен.`, undefined, {
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
            tap((result) => this.snackBar.open(`Шаблон № ${result.id} обновлен.`, undefined, {
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
