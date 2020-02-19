import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OrderDto} from '../_models/order-dto';

@Component({
    selector: 'app-delete-order-dialog',
    templateUrl: './delete-order-dialog.component.html',
    styleUrls: ['./delete-order-dialog.component.scss'],
})
export class DeleteOrderDialogComponent implements OnInit {


    constructor(public dialogRef: MatDialogRef<DeleteOrderDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: OrderDto) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
