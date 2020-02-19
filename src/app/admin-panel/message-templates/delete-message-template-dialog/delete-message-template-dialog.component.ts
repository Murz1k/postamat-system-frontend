import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NotificationTemplateDto} from '../_models/notification-template-dto';

@Component({
    selector: 'app-delete-message-template',
    templateUrl: './delete-message-template-dialog.component.html',
    styleUrls: ['./delete-message-template-dialog.component.scss'],
})
export class DeleteMessageTemplateDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DeleteMessageTemplateDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: NotificationTemplateDto) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
