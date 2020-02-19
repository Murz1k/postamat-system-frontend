import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MessagesService} from '../messages.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {NotificationServiceConfig} from '../_models/notification-service-config';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-notifications-settings-dialog',
    templateUrl: './notifications-settings-dialog.component.html',
    styleUrls: ['./notifications-settings-dialog.component.scss'],
})
export class NotificationsSettingsDialogComponent implements OnInit, OnDestroy {

    settings$: Observable<NotificationServiceConfig>;

    constructor(private messagesService: MessagesService, public dialogRef: MatDialogRef<NotificationsSettingsDialogComponent>) {
    }

    ngOnInit() {
        this.settings$ = this.messagesService.getNotificationsSettings().pipe(
            untilDestroyed(this)
        );
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnDestroy(): void {
    }
}
