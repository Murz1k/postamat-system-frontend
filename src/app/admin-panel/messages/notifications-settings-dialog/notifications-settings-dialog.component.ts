import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MessagesService} from '../messages.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {NotificationServiceConfig} from '../_models/notification-service-config';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {ClientNotificationService} from '../../message-templates/client-notification.service';
import {map, withLatestFrom} from 'rxjs/operators';
import {NotificationStatus} from '../_models/notification-status';

@Component({
    selector: 'app-notifications-settings-dialog',
    templateUrl: './notifications-settings-dialog.component.html',
    styleUrls: ['./notifications-settings-dialog.component.scss'],
})
export class NotificationsSettingsDialogComponent implements OnInit, OnDestroy {

    settings$: BehaviorSubject<NotificationServiceConfig | any> = new BehaviorSubject<NotificationServiceConfig | any>(undefined);
    statuses: { label: string, value: NotificationStatus }[] = [];

    constructor(private messagesService: MessagesService, public dialogRef: MatDialogRef<NotificationsSettingsDialogComponent>,
                public clientNotificationService: ClientNotificationService) {
    }

    ngOnInit() {
        this.statuses = this.clientNotificationService.getStatusDictionary();
        this.messagesService.getNotificationsSettings().pipe(
            untilDestroyed(this),
            map(settings => ({
                ...settings,
                automaticalyCheckedStatuses: settings.automaticalyCheckedStatuses ? [...settings.automaticalyCheckedStatuses] : [],
            })),
        ).subscribe(this.settings$);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
    }

    addStatus() {
        const value = this.settings$.getValue();
        value.automaticalyCheckedStatuses = [NotificationStatus.NotFound,
            ...this.settings$.getValue().automaticalyCheckedStatuses];
        this.settings$.next(value);
    }

    deleteStatus(i: number) {
        const value = this.settings$.getValue();
        value.automaticalyCheckedStatuses = value.automaticalyCheckedStatuses.filter((_, index) => index !== i);
        this.settings$.next(value);
    }
}
