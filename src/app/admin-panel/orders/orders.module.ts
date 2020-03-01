import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list/orders-list.component';
import {OrdersRoutingModule} from './orders-routing.module';
import {
    MatButtonModule,
    MatCardModule, MatDialogModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule, MatMenuModule,
    MatPaginatorModule,
    MatSelectModule,
    MatTableModule,
} from '@angular/material';
import { OrderCreateComponent } from './order-create/order-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DeleteOrderDialogComponent } from './delete-order-dialog/delete-order-dialog.component';
import {NgxSpinnerModule} from 'ngx-spinner';



@NgModule({
  declarations: [OrdersListComponent, OrderCreateComponent, DeleteOrderDialogComponent],
    imports: [
        OrdersRoutingModule,
        CommonModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        FormsModule,
        NgxSpinnerModule,
    ],
    entryComponents: [DeleteOrderDialogComponent, OrderCreateComponent]
})
export class OrdersModule { }
