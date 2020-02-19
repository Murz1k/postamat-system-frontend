import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {BehaviorSubject, fromEvent, interval} from 'rxjs';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {SentMessage} from '../_models/sent-message';
import {MessagesService} from '../messages.service';
import {NotificationsSettingsDialogComponent} from '../notifications-settings-dialog/notifications-settings-dialog.component';
import {NotificationStatus} from '../_models/notification-status';
import { MessageSendResult } from '../_models/message-send-result';

@Component({
    selector: 'app-message-templates-list',
    templateUrl: './messages-list.component.html',
    styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit, OnDestroy {
    dataSource = new MatTableDataSource<SentMessage>();
    queueDataSource = new MatTableDataSource<SentMessage>();

    @ViewChild('paginator1', {static: true}) paginator1: MatPaginator;
    @ViewChild('paginator2', {static: true}) paginator2: MatPaginator;

    editableTexts: { [id: string]: SentMessage } = {};

    NotificationStatus = NotificationStatus;
    MessageSendResult = MessageSendResult;

    displayedColumns: string[] = [
        'messageId',
        'phoneNumber',
        'message',
        'sendResult',
        'status',
        'registeredTimestamp',
        'sendingTimeStamp',
        'lastChangeStatusTimestamp',
    ];

    fromDate = new Date();
    toDate = new Date();
    private dateChanges$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(public clientNotificationService: MessagesService, public dialog: MatDialog) {
    }

    ngOnInit() {
        this.fromDate = new Date(this.toDate.getTime() - 5 * 24 * 60 * 60 * 1000);
        this.toDate = new Date();

        fromEvent(document, 'keyup').pipe(
            untilDestroyed(this),
            filter((event: KeyboardEvent) => event.key === 'Escape' && Object.keys(this.editableTexts).length > 0),
            tap(() => this.editableTexts = {}),
        ).subscribe();


        this.dataSource.paginator = this.paginator1;
        this.queueDataSource.paginator = this.paginator2;

        this.dateChanges$.pipe(
            distinctUntilChanged(),
            debounceTime(500),
            filter(value => value),
            tap(() => this.dateChanges$.next(false)),
            switchMap(() => this.clientNotificationService.getMessages(this.fromDate.getTime(), this.toDate.getTime()).pipe(
                untilDestroyed(this),
                tap(templates => this.dataSource.data = templates),
                switchMap(() => interval(60000).pipe(
                    switchMap(() => this.clientNotificationService.getMessages(this.fromDate.getTime(), this.toDate.getTime()).pipe(
                        tap(templates => this.dataSource.data = templates),
                    )),
                )),
            )),
        ).subscribe();
    }

    ngOnDestroy(): void {
    }

    changeDate() {
        this.dateChanges$.next(true);
    }

    tabIndexChanged($event: number) {
        if ($event === 1) {
            this.loadQueueMessages();
        }
    }

    loadQueueMessages() {
        this.clientNotificationService.getQueueMessages().pipe(
            tap(messages => this.queueDataSource.data = messages),
        ).subscribe();
    }

    reloadMessages() {
        this.dateChanges$.next(true);
    }

    showSettings() {
        this.dialog.open(NotificationsSettingsDialogComponent, {
            width: '500px',
        }).afterClosed().pipe(
            filter(value => value),
            switchMap(result => this.clientNotificationService.updateNotificationsSettings(result)),
        ).subscribe();
    }

    isErrorStatus(status: NotificationStatus): boolean {
        return [NotificationStatus.Expired, NotificationStatus.UnableToDeliver, NotificationStatus.WrongNumber,
            NotificationStatus.NotEnoughtMoney, NotificationStatus.NotRequested,
            NotificationStatus.NotFound].includes(status);
    }
}
