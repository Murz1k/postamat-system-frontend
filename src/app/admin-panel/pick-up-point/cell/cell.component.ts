import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionLike} from 'rxjs';

import {NgxSpinnerService} from 'ngx-spinner';
import {CellService} from '../../../common/service/cell.service';

import {Cell, OpenLockItemDto, OpenLockResultDto, WaitLoadItem} from '../../../common/model/cell.model';
import {CellsOperationsAuthorizationDto} from '../../../common/model/user.model';
import {MaterialService} from '../../../common/material.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit, OnDestroy {

  spinnerText: string;
  private subscriptions$: SubscriptionLike[] = [];
  cells: Cell[] = [];
  waitingLoadItems: WaitLoadItem[];
  private postamatId: string;
  usersCellsAccess: CellsOperationsAuthorizationDto;

  constructor(private spinner: NgxSpinnerService,
              private activatedRoute: ActivatedRoute,
              private modal: MatSnackBar,
              private cellService: CellService) {
  }

  /**
   * Метод, стартующий в самом начале загрузки страницы
   * - получаем список ожидающих загрузки товаров
   * - если в обсервере пусто (мы переходили по прямой ссылке)
   *    тогда делаем прямой запрос к API, получая список ячеек
   */
  ngOnInit() {
    this.spinnerText = 'Получаем данные о ячейках постамата';
    this.spinner.show();
    this.postamatId = this.activatedRoute.snapshot.params.id;
    this.getWaitingItemsRequest();
    this.usersCellsAccess = JSON.parse(localStorage.getItem('currentUser')).cellsOperationsAuthorization;
    MaterialService.initTabs();
    this.subscriptions$.push(this.cellService.cell$
        .subscribe((data: Cell[]) => {
          if (data.length === 0) {
            this.getCellsRequest();
          } else {
            this.cells = data;
            this.spinner.hide();
          }
        }, e => this.requestErrorHandle(e, true)));
  }

  /**
   * Получение списка ячеек с API
   */
  getCellsRequest(): void {
    this.subscriptions$.push(this.cellService.getCellsFromOnePickUpPoint(this.postamatId)
        .subscribe((data: Cell[]) => this.cells = data,
            e => this.requestErrorHandle(e, true),
            () => this.spinner.hide()));
  }

  /**
   * Получение списка ожидаемых загрузок с API
   */
  getWaitingItemsRequest(): void {
    this.subscriptions$.push(this.cellService.getWaitLoadItemsFromOnePickUpPoint(this.postamatId)
        .subscribe((data: WaitLoadItem[]) => this.waitingLoadItems = data,
            e => this.requestErrorHandle(e, false)));
  }

  /**
   * Метод открывания ячейки
   * @param id - string. Адрес ячейки в постамате
   */
  openCurrentCell(id: string) {
    this.spinner.show();
    const dataToOpenCell: OpenLockItemDto = {
      postomatId: this.postamatId,
      openLockItem: {
        lockCode: id
      }
    };
    this.cellService.openLock(dataToOpenCell)
        .subscribe((res: OpenLockResultDto) => {
              this.openLockResultHandle(res.result);
              if (res.result === 2) {
                const idx = this.cells.findIndex(p => id === p.lockAddress);
                this.cells[idx].isClose = false;
              }
            },
            e => this.requestErrorHandle(e, true));
  }

  cellTextStatus(status: string) {
    return this.cellService.getCellsStatusText(parseInt(status, 10));
  }

  /**
   * Вывод ответа при открывании ячейки
   * @param response - number. Ответ API
   */
  openLockResultHandle(response: number) {
    this.modal.open(OpenLockResultDto.getDescription(response), 'Закрыть', {
      duration: 3000
    });
    this.spinner.hide();
  }

  /**
   * Вывод ошибок
   * @param reject - any. Сама ошибка
   * @param isSpinnerHide - boolean. Значение, при котором спиннер останавливается
   */
  requestErrorHandle(reject: any, isSpinnerHide: boolean) {
    this.modal.open(`Ошибка ${reject.status}`, 'Закрыть', {
      duration: 3000
    });
    if (isSpinnerHide) {
      this.spinner.hide();
    }
  }

  /**
   * Метод, исполняющийся при уходе со страницы
   * - отписываемся от подписки в ngOnInit
   */
  ngOnDestroy() {
    this.subscriptions$.forEach((sub) => sub.unsubscribe());
    this.subscriptions$ = [];
  }
}
