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
    MatPaginatorModule, MatSelectModule,
    MatTableModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageTemplateCreateComponent} from './message-template-create/message-template-create.component';
import {DeleteMessageTemplateDialogComponent} from './delete-message-template-dialog/delete-message-template-dialog.component';
import {NgxSpinnerModule} from 'ngx-spinner';

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
        NgxSpinnerModule,
        MatSelectModule,
    ],
    entryComponents: [MessageTemplateCreateComponent, DeleteMessageTemplateDialogComponent],
})
export class MessageTemplatesModule {
}
