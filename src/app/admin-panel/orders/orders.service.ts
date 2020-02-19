import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {OrderDto} from './_models/order-dto';
import {MatSnackBar} from '@angular/material';
import {Route, Router} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class OrdersService {

    fieldNames = {
        id: 'id',
        supplier: 'Поставщик',
        orderId: 'ID заказа',
        externalId: 'Внешний ID заказа',
        customerName: 'ФИО клиента',
        customerPhone: 'Телефон клиента',
        customerExternalId: 'Внешний ID клиента',
        customerEmail: 'Email клиента',
        customerDeliveryAddress: 'Адрес доставки клиента',
        productSize: 'Размер товара',
        productWidth: 'Ширина товара [мм]',
        productHeight: 'Высота товара [мм]',
        productDepth: 'Шлубина товара [мм]',
        productWeight: 'Вес товара [кг]',
        productExternalBarCode: 'Внешний штрихкод товара',
        productManufacturerBarCode: 'Штрихкод производителя',
        externalPackaging: 'Внешнее упаковочное место',
        postamateUploadType: 'Тип загрузки в постомат',
        postamateId: 'ID постамата',
        vendorCode: 'Артикул',
        manufacturer: 'Производитель',
        productName: 'Наименование товара',
        quantity: 'Количество',
        price: 'Цена',
        sum: 'Сумма',
        manufacturerCountry: 'Страна производитель',
        gtd: 'Грузотаможенная декларация',
        vat: 'Ставка НДС',
        paymentType: 'Тип оплаты',
    };

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    }

    getOrders(): Observable<OrderDto[]> {
        return this.http.get<OrderDto[]>(`${environment.apiUrl}/api/Orders`).pipe(map(orders => orders ? orders : []));
    }

    createOrder(form: OrderDto): Observable<OrderDto> {
        return this.http.post<OrderDto>(`${environment.apiUrl}/api/Orders`, form).pipe(
            tap(() => {
                this.snackBar.open(`Заказ № ${form.orderId} добавлен.`, undefined, {
                    duration: 7000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                });
            }),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    this.snackBar.open(Object.keys(err.error).map(key => err.error[key]).join('\n'), undefined, {
                        duration: 30000,
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                    });
                }
                return of(err);
            }));
    }

    updateOrder(form: OrderDto): Observable<OrderDto> {
        return this.http.put<OrderDto>(`${environment.apiUrl}/api/Orders`, form).pipe(
            tap(() => this.snackBar.open(`Заказ № ${form.orderId} обновлен.`, undefined, {
                duration: 7000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
            })),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    this.snackBar.open(Object.keys(err.error).map(key => err.error[key]).join('\n'), undefined, {
                        duration: 30000,
                        verticalPosition: 'top',
                        horizontalPosition: 'right',
                    });
                }
                return of(err);
            }));
    }

    deleteOrder(orderId: string) {
        // Для теста что заказ не найден или удален
        // orderId = '42fa7e6d-1f4e-40cd-8a58-b98c855ef44a';
        return this.http.delete(`${environment.apiUrl}/api/Orders/${orderId}`).pipe(
            tap(() => this.snackBar.open(`Заказ № ${orderId} удален.`, undefined, {
                    duration: 7000,
                    verticalPosition: 'top',
                    horizontalPosition: 'right',
                }),
            ),
            catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 404) {
                        this.snackBar.open(`Заказ № ${orderId} не найден или уже удален.`, undefined, {
                            duration: 30000,
                            verticalPosition: 'top',
                            horizontalPosition: 'right',
                        });
                    }
                }
                return throwError(err);
            }));
    }

    getOrderById(orderId: string): Observable<OrderDto> {
        return this.http.get<OrderDto>(`${environment.apiUrl}/api/Orders/${orderId}`);
    }
}
