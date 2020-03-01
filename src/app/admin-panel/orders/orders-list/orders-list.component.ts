import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrdersService} from '../orders.service';
import {fromEvent, throwError} from 'rxjs';
import {OrderDto} from '../_models/order-dto';
import {MatDialog, MatPaginator, MatTable, MatTableDataSource} from '@angular/material';
import {catchError, filter, finalize, map, switchMap, tap} from 'rxjs/operators';
import {DeleteOrderDialogComponent} from '../delete-order-dialog/delete-order-dialog.component';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {OrderCreateComponent} from '../order-create/order-create.component';
import {PickUpPointService} from '../../../common/service/pick-up-point.service';
import {PickUpPoint} from '../../../common/model/pick-up-point.model';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-orders-list',
    templateUrl: './orders-list.component.html',
    styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit, OnDestroy {
    dataSource = new MatTableDataSource<OrderDto>();

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatTable, {static: true}) table: MatTable<OrderDto>;

    editableOrders: { [id: string]: OrderDto } = {};

    displayedColumns: string[] = [
        'supplier',
        'orderId',
        'externalId',
        'customerName',
        'customerPhone',
        'customerExternalId',
        'customerEmail',
        'customerDeliveryAddress',
        'productSize',
        'productWidth',
        'productHeight',
        'productDepth',
        'productWeight',
        'productExternalBarCode',
        'productManufacturerBarCode',
        'externalPackaging',
        'postamateUploadType',
        'postamate',
        'vendorCode',
        'manufacturer',
        'productName',
        'quantity',
        'price',
        'sum',
        'manufacturerCountry',
        'gtd',
        'vat',
        'paymentType',

        'star', // Действия
    ];

    postamates: PickUpPoint[] = [];
    spinnerText = '';

    constructor(private spinner: NgxSpinnerService,
                public orderService: OrdersService, public dialog: MatDialog, private _el: ElementRef, public pickUpPointService: PickUpPointService) {
    }

    ngOnInit() {
        this.paginator._intl.itemsPerPageLabel = 'Шаблонов на странице';
        this.dataSource.paginator = this.paginator;

        fromEvent(document, 'keyup').pipe(
            untilDestroyed(this),
            filter((event: KeyboardEvent) => event.key === 'Escape' && Object.keys(this.editableOrders).length > 0),
            tap(() => this.editableOrders = {}),
        ).subscribe();

        this.spinnerText = 'Получение списка заказов';
        this.spinner.show();
        this.pickUpPointService.getAllPickUpPoints().pipe(
            untilDestroyed(this),
            tap(postamates => this.postamates = postamates),
            switchMap(() => this.orderService.getOrders().pipe(
                untilDestroyed(this),
                map(orders => orders.map(order => ({...order, postamate: this.postamates.find(i => i.id === order.postamateId)}))),
                tap(orders => this.dataSource.data = orders),
                catchError(err => {
                    this.spinner.hide();
                    return throwError(err);
                }),
                finalize(() => this.spinner.hide()),
            )),
            catchError(err => {
                this.spinner.hide();
                return throwError(err);
            }),
        ).subscribe();
    }

    deleteOrder(order: OrderDto) {
        const dialogRef = this.dialog.open(DeleteOrderDialogComponent, {
            width: '400px',
            data: order,
        });

        dialogRef.afterClosed().pipe(
            filter(result => !!result),
            switchMap((result: OrderDto) => this.orderService.deleteOrder(result.id)),
            tap(() => this.dataSource.data = this.dataSource.data.filter(i => i.id !== order.id)),
        ).subscribe();
    }

    startEdit(element: OrderDto) {
        this.editableOrders[element.id] = element;
    }

    createOrder() {
        this.dialog.open(OrderCreateComponent, {
            width: '45vw',
            height: '80vh',
        }).afterClosed().subscribe((result: OrderDto) => {
            if (result !== undefined) {
                if (this.postamates.length) {
                    result['postamate'] = this.postamates.find(i => i.id === result.postamateId);
                }
                this.dataSource.data = [result, ...this.dataSource.data];
            }
        });
    }

    updateOrder(order: OrderDto) {
        this.orderService.updateOrder(order).pipe(
            tap(() => {
                const listItem = this.dataSource.data.find(i => i.id === order.id);
                if (this.postamates.length) {
                    listItem['postamate'] = this.postamates.find(i => i.id === listItem.postamateId);
                }
                Object.assign(listItem, this.editableOrders[order.id]);
                this.editableOrders[order.id] = undefined;
            }),
        ).subscribe();
    }

    cancelEdit(element: any) {
        this.editableOrders[element.id] = undefined;
    }

    ngOnDestroy(): void {
    }
}
