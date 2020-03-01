import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
import {fromEvent} from 'rxjs';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {filter, finalize, switchMap, tap} from 'rxjs/operators';
import {NotificationTemplateDto} from '../_models/notification-template-dto';
import {ClientNotificationService} from '../client-notification.service';
import {MessageTemplateCreateComponent} from '../message-template-create/message-template-create.component';
import {DeleteMessageTemplateDialogComponent} from '../delete-message-template-dialog/delete-message-template-dialog.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {NotificationStatus} from '../../messages/_models/notification-status';

@Component({
    selector: 'app-message-templates-list',
    templateUrl: './message-templates-list.component.html',
    styleUrls: ['./message-templates-list.component.scss'],
})
export class MessageTemplatesListComponent implements OnInit, OnDestroy {
    dataSource = new MatTableDataSource<NotificationTemplateDto>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatTable, {static: true}) table: MatTable<NotificationTemplateDto>;

    editableTexts: { [id: string]: NotificationTemplateDto } = {};
    statuses: { label: string, value: NotificationStatus }[] = [];

    displayedColumns: string[] = [
        // 'id',
        'message',
        'description',
        'status',

        'star', // Действия
    ];
    spinnerText = '';

    constructor(private spinner: NgxSpinnerService,
                public clientNotificationService: ClientNotificationService, public dialog: MatDialog, private _el: ElementRef) {
    }

    ngOnInit() {
        this.statuses = this.clientNotificationService.getStatusDictionary();
        fromEvent(document, 'keyup').pipe(
            untilDestroyed(this),
            filter((event: KeyboardEvent) => event.key === 'Escape' && Object.keys(this.editableTexts).length > 0),
            tap(() => this.editableTexts = {}),
        ).subscribe();

        this.paginator._intl.itemsPerPageLabel = 'Шаблонов на странице';
        this.dataSource.paginator = this.paginator;
        this.spinnerText = 'Получение шаблонов сообщений пользователей';
        this.spinner.show();
        this.clientNotificationService.getMessageTemplates().pipe(
            untilDestroyed(this), tap(templates => this.dataSource.data = templates),
            finalize(() => this.spinner.hide())).subscribe();
    }

    deleteMessage(order: NotificationTemplateDto) {
        this.dialog.open(DeleteMessageTemplateDialogComponent, {
            width: '400px',
            data: order,
        }).afterClosed().pipe(
            filter(result => !!result),
            switchMap((result: NotificationTemplateDto) => this.clientNotificationService.deleteTemplate(result)),
            tap(() => this.dataSource.data = this.dataSource.data.filter(i => i.id !== order.id)),
        ).subscribe();
    }

    startEdit(element: NotificationTemplateDto) {
        this.editableTexts[element.id] = element;
    }

    updateMessage(order: NotificationTemplateDto) {
        this.clientNotificationService.updateTemplate(order).pipe(
            tap(() => {
                const listItem = this.dataSource.data.find(i => i.id === order.id);
                Object.assign(listItem, this.editableTexts[order.id]);
                this.editableTexts[order.id] = undefined;
            }),
        ).subscribe();
    }

    cancelEdit(element: any) {
        this.editableTexts[element.id] = undefined;
    }

    ngOnDestroy(): void {
    }

    createTemplate() {
        this.dialog.open(MessageTemplateCreateComponent, {
            width: '45vw',
        }).afterClosed().subscribe((result: NotificationTemplateDto) => {
            if (result !== undefined) {
                this.dataSource.data = [result, ...this.dataSource.data];
            }
        });
    }
}
