import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesListComponent } from './messages-list/messages-list.component';
import {MessagesRoutingModule} from './messages-routing.module';
import {
    MatButtonModule, MatCheckboxModule, MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule, MatTabsModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotificationsSettingsDialogComponent} from './notifications-settings-dialog/notifications-settings-dialog.component';
import {TickDatePipeModule} from '../../common/components/tick-date.pipe/tick-date.pipe.module';

@NgModule({
  declarations: [MessagesListComponent, NotificationsSettingsDialogComponent],
    imports: [
        MessagesRoutingModule,
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
        MatDatepickerModule,
        MatTabsModule,
        MatCheckboxModule,
        TickDatePipeModule,
    ],
    entryComponents: [NotificationsSettingsDialogComponent]
})
export class MessagesModule { }
