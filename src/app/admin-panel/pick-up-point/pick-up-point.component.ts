import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { NgxSpinnerService } from 'ngx-spinner';
import { PickUpPointService } from '../../common/service/pick-up-point.service';
import { CellService } from '../../common/service/cell.service';

import { PickUpPoint } from '../../common/model/pick-up-point.model';
import { Cell } from '../../common/model/cell.model';

import { AddPickUpPointComponent } from './add-pick-up-point/add-pick-up-point.component';
import { UpdatePickUpPointComponent } from './update-pick-up-point/update-pick-up-point.component';

@Component({
  selector: 'app-pick-up-point',
  templateUrl: './pick-up-point.component.html',
  styleUrls: ['./pick-up-point.component.scss']
})
export class PickUpPointComponent implements OnInit, OnDestroy {

  userRole: number;
  spinnerText: string;
  public postamats$: Subscription;
  public cells$: Subscription;
  public pickUpPoints: PickUpPoint[];
  public newPickUpPoint: PickUpPoint;
  public pickUpPointToUpdate: PickUpPoint;

  constructor(private spinner: NgxSpinnerService,
              private pupService: PickUpPointService,
              private cellService: CellService,
              private router: Router,
              public dialog: MatDialog,
              private modal: MatSnackBar) { }

  /**
   * Метод, стартующий в самом начале загрузки страницы
   * - получаем список постаматов и подписываемся на него
   */
  ngOnInit(): void {
    this.userRole = JSON.parse(localStorage.getItem('currentUser')).currentUser.role;
    this.spinnerText = 'Получение данных о постаматах';
    this.spinner.show();
    this.pickUpPoints = new Array<PickUpPoint>();
    this.postamats$ = this.pupService.getAllPickUpPoints()
        .subscribe((res: PickUpPoint[]) => {
          (res === null) ? this.pickUpPoints = [] : this.pickUpPoints = res;
          this.spinner.hide();
        }, e => this.requestErrorHandle(e, true));
  }

  /**
   * Метод создает новый постамат
   * с помощью модального окна из Angular Material
   */
  createNewPickUpPoint(): void {
    this.newPickUpPoint = new PickUpPoint();
    const addPickUpPointModalWindow = this.dialog.open(AddPickUpPointComponent, {
      width: '45vw',
      data: { id: this.newPickUpPoint.id,
        name: this.newPickUpPoint.name,
        location: this.newPickUpPoint.location,
        ip: this.newPickUpPoint.ip,
        port: this.newPickUpPoint.port
      }
    });
    addPickUpPointModalWindow.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.spinnerText = 'Добавление нового постамата';
        this.spinner.show();
        this.newPickUpPoint = result;
        this.newPickUpPoint.id = '00000000-0000-0000-0000-000000000000';
        this.pupService.addPickUpPoint(this.newPickUpPoint)
            .subscribe((res: PickUpPoint) => {
              this.pickUpPoints.push(res);
              this.spinner.hide();
            }, e => this.requestErrorHandle(e, true));
      }
    });
  }

  /**
   * Метод обновления информации о постамате
   * с помощью модального окна
   * @param id - string. Гуид постамата
   */
  updatePickUpPoint(id: string): void {
    this.pickUpPointToUpdate = new PickUpPoint();
    this.pickUpPoints.forEach(el => {
      if (el.id === id) { this.pickUpPointToUpdate = el; }
    });
    const updatePickUpPointModalWindow = this.dialog.open(UpdatePickUpPointComponent, {
      width: '45vw',
      data: { id: this.pickUpPointToUpdate.id,
        name: this.pickUpPointToUpdate.name,
        location: this.pickUpPointToUpdate.location,
        ip: this.pickUpPointToUpdate.ip,
        port: this.pickUpPointToUpdate.port
      }
    });
    updatePickUpPointModalWindow.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.spinnerText = 'Обновление данных выбранного постамата';
        this.spinner.show();
        this.pupService.updatePickUpPoint(result)
          .subscribe( (res: PickUpPoint) => {
            this.pickUpPoints.forEach((el, i) => {
              if (res.id === el.id) { this.pickUpPoints[i] = res; }
            });
            this.spinner.hide();
          }, e => this.requestErrorHandle(e, true));
      }
    });
  }

  /**
   * Метод удаления постамата
   * с всплывающим браузерным уведомлением
   * @param id - string. Гуид постамата
   */
  removePickUpPoint(id: string): void {
    if (confirm('Вы действительно хотите удалить постамат?')) {
      this.spinnerText = 'Удаление выбранного постамата';
      this.spinner.show();
      this.pupService.deletePickUpPoint(id)
          .subscribe( () => {
                this.pickUpPoints.forEach((el, i) => {
                  if (el.id === id) {
                    this.pickUpPoints.splice(i, 1);
                  }
                });
                this.spinner.hide();
              }, e => this.requestErrorHandle(e, true));
    }
  }

  /**
   * Метод получения всех ячеек выбранного постамата
   * При наличии ячеек - редирект на страницу ячеек
   * Передаем данные через BehaviorSubject
   * @param id - string. Гуид постамата
   */
  getCellsInCurrentPickUpPoint(id: string): void {
    this.spinnerText = 'Получение данных о ячейках выбранного постамата';
    this.spinner.show();
    this.cells$ = this.cellService.getCellsFromOnePickUpPoint(id)
        .subscribe((cells: Cell[]) => {
          switch (cells) {
            case null: {
              this.modal.open('Ячейки отсутствуют', 'Закрыть', {
                duration: 3000
              });
              break;
            }
            default: {
              this.cellService.transferDataCells(cells);
              this.router.navigate(['admin/pick-up-point/', id]);
              break;
            }
          }
          this.spinner.hide();
          this.cells$.unsubscribe();
        }, (e => this.requestErrorHandle(e, true)));
  }

  requestErrorHandle(reject: any, isSpinnerHide: boolean) {
    this.modal.open(`Ошибка ${reject.status}`, 'Закрыть', {
      duration: 3000
    });
    if (isSpinnerHide) { this.spinner.hide(); }
  }

  /**
   * Метод, исполняющийся при уходе со страницы
   * - отписываемся от подписки в ngOnInit
   */
  ngOnDestroy(): void {
    this.postamats$.unsubscribe();
  }
}
