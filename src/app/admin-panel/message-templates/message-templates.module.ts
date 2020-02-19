import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MessageTemplatesListComponent} from './message-templates-list/message-templates-list.component';
import {MessageTemplatesRoutingModule} from './message-templates-routing.module';
import {
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageTemplateCreateComponent} from './message-template-create/message-template-create.component';
import {DeleteMessageTemplateDialogComponent} from './delete-message-template-dialog/delete-message-template-dialog.component';

@NgModule({
    declarations: [MessageTemplatesListComponent, MessageTemplateCreateComponent, DeleteMessageTemplateDialogComponent],
    imports: [
        MessageTemplatesRoutingModule,
        CommonModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatMenuModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
    entryComponents: [MessageTemplateCreateComponent, DeleteMessageTemplateDialogComponent],
})
export class MessageTemplatesModule {
}
