import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, filter, switchMap, tap} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {MatDialogRef} from '@angular/material';
import {ClientNotificationService} from '../client-notification.service';
import {NotificationTemplateDto} from '../_models/notification-template-dto';
import {NotificationStatus} from '../../messages/_models/notification-status';

@Component({
    selector: 'app-message-template',
    templateUrl: './message-template-create.component.html',
    styleUrls: ['./message-template-create.component.scss'],
})
export class MessageTemplateCreateComponent implements OnInit, OnDestroy {
    form: FormGroup;
    private tasksSubject: BehaviorSubject<Observable<any>> = new BehaviorSubject<Observable<any>>(undefined);

    statuses: { label: string, value: NotificationStatus }[] = [];

    constructor(public dialogRef: MatDialogRef<MessageTemplateCreateComponent>,
                private fb: FormBuilder, public clientNotificationService: ClientNotificationService) {
    }

    ngOnInit() {
        this.statuses = this.clientNotificationService.getStatusDictionary();

        this.tasksSubject
            .pipe(
                untilDestroyed(this),
                filter((obs) => !!obs),
                debounceTime(500),
                switchMap((obs) => obs),
            )
            .subscribe();

        this.form = this.fb.group({
            message: ['', [Validators.required]],
            description: ['', [Validators.required]],
            status: ['', [Validators.required]],
        });

        // Для теста
        // this.form.patchValue({
        //     message: 'string',
        //     description: 'string',
        //     status: 0,
        // });
    }

    addOrder() {
        if (this.form.invalid) {
            // tslint:disable-next-line:forin
            for (const i in this.form.controls) {
                this.form.controls[i].markAsDirty();
                this.form.controls[i].updateValueAndValidity();
            }
            return;
        }

        this.tasksSubject.next(
            this.clientNotificationService.createTemplate(this.form.value as NotificationTemplateDto).pipe(
                tap((newOrder) => this.dialogRef.close(newOrder)),
            ),
        );
    }

    ngOnDestroy(): void {
    }
}
