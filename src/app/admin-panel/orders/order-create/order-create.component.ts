import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrdersService} from '../orders.service';
import {OrderDto} from '../_models/order-dto';
import {BehaviorSubject, Observable} from 'rxjs';
import {debounceTime, filter, switchMap, tap} from 'rxjs/operators';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {MatDialogRef} from '@angular/material';
import {PickUpPointService} from '../../../common/service/pick-up-point.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.scss']
})
export class OrderCreateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private tasksSubject: BehaviorSubject<Observable<any>> = new BehaviorSubject<Observable<any>>(undefined);

  constructor(public pickUpPointService: PickUpPointService, public dialogRef: MatDialogRef<OrderCreateComponent>, private fb: FormBuilder, public orderService: OrdersService) {
  }

  ngOnInit() {
    this.tasksSubject
      .pipe(
        untilDestroyed(this),
        filter((obs) => !!obs),
        debounceTime(500),
        switchMap((obs) => obs),
      )
      .subscribe();

    this.form = this.fb.group({
      supplier: ['', [Validators.required]],
      orderId: ['', [Validators.required]],
      externalId: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      customerPhone: ['', [Validators.required]],
      customerExternalId: ['', [Validators.required]],
      customerEmail: ['', [Validators.required]],
      customerDeliveryAddress: ['', [Validators.required]],
      productSize: ['', [Validators.required]],
      productWidth: ['', [Validators.required]],
      productHeight: ['', [Validators.required]],
      productDepth: ['', [Validators.required]],
      productWeight: ['', [Validators.required]],
      productExternalBarCode: ['', [Validators.required]],
      productManufacturerBarCode: ['', [Validators.required]],
      externalPackaging: ['', [Validators.required]],
      postamateUploadType: ['', [Validators.required]],
      postamateId: ['', [Validators.required]],
      vendorCode: ['', [Validators.required]],
      manufacturer: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      sum: ['', [Validators.required]],
      manufacturerCountry: ['', [Validators.required]],
      gtd: ['', [Validators.required]],
      vat: ['', [Validators.required]],
      paymentType: ['', [Validators.required]],
    });

    // Для теста
    // this.form.patchValue({
    //   supplier: 'string',
    //   orderId: 'string',
    //   externalId: 'string',
    //   customerName: 'string',
    //   customerPhone: 'string',
    //   customerExternalId: 'string',
    //   customerEmail: 'string',
    //   customerDeliveryAddress: 'string',
    //   productSize: 'string',
    //   productWidth: 0,
    //   productHeight: 0,
    //   productDepth: 0,
    //   productWeight: 0,
    //   productExternalBarCode: 'string',
    //   productManufacturerBarCode: 'string',
    //   externalPackaging: 'string',
    //   postamateUploadType: 'string',
    //   postamateId: '42fa7e6d-3f4e-40cd-8a58-b98c855ef44b',
    //   vendorCode: 'string',
    //   manufacturer: 'string',
    //   productName: 'string',
    //   quantity: 0,
    //   price: 0,
    //   sum: 0,
    //   manufacturerCountry: 'string',
    //   gtd: 'string',
    //   vat: 0,
    //   paymentType: 0
    // });
  }

  addOrder() {
    if (this.form.invalid) {
      // tslint:disable-next-line:forin
      for (const i in this.form.controls) {
        this.form.controls[i].markAsDirty();
        this.form.controls[i].markAsTouched();
        this.form.controls[i].updateValueAndValidity();
      }
      return;
    }

    this.tasksSubject.next(
      this.orderService.createOrder(this.form.value as OrderDto).pipe(tap((newOrder) => this.dialogRef.close(newOrder)))
    );
  }

  ngOnDestroy(): void {
  }
}
