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
    MatPaginatorModule, MatSelectModule,
    MatTableModule, MatTabsModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotificationsSettingsDialogComponent} from './notifications-settings-dialog/notifications-settings-dialog.component';
import {TickDatePipeModule} from '../../common/components/tick-date.pipe/tick-date.pipe.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NzButtonModule, NzDatePickerModule, NzIconModule, NzTableModule} from 'ng-zorro-antd';

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
        NgxSpinnerModule,
        NzDatePickerModule,
        NzTableModule,
        NzButtonModule,
        NzIconModule,
        MatSelectModule,
        MatSelectModule,
    ],
    entryComponents: [NotificationsSettingsDialogComponent]
})
export class MessagesModule { }
