import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';

import { RestService } from './rest.service';

import {Cell, OpenLockItemDto, OpenLockResultDto, ReserveItemDto,
  WaitLoadItem, WaitLoadItemsDto} from '../model/cell.model';

@Injectable()
export class CellService extends RestService {

  CellUri: string;

  /**
   * BehaviorSubject и стрим, на который будут подписываться компоненты
   * для передачи данных между друг другом
   */
  private cellsSubject = new BehaviorSubject(new Array<Cell>());
  cell$ = this.cellsSubject.asObservable();

  constructor(public http: HttpClient) {
    super(http);
    this.CellUri = 'Cells';
  }

  getCellsFromOnePickUpPoint(id: string): Observable<Cell[]> {
    return this.getMethod<Cell[]>(`${this.CellUri}/${id}`);
  }

  getWaitLoadItemsFromOnePickUpPoint(id: string): Observable<WaitLoadItem[]> {
    return this.getMethod<WaitLoadItem[]>(`${this.CellUri}/GetWaitLoadItems/${id}`);
  }

  addWaitLoadItem(item: WaitLoadItemsDto): Observable<WaitLoadItem[]> {
    return this.postMethod<WaitLoadItem[]>(`${this.CellUri}/WaitLoadItem`, item);
  }

  reserveCellToReturn(reserveItem: ReserveItemDto): Observable<Cell> {
    return this.postMethod<Cell>(`${this.CellUri}/Reserve`, reserveItem);
  }

  openLock(item: OpenLockItemDto): Observable<OpenLockResultDto> {
    return  this.postMethod<OpenLockResultDto>(`${this.CellUri}/OpenLock`, item);
  }

  /**
   * Метод для занесения данных в BehaviorSubject
   * на который подпишутся несколько компонентов
   * @param cell - Cell[]. Массив ячеек
   */
  transferDataCells(cell: Cell[]) {
    this.cellsSubject.next(cell);
  }

  /**
   * Метод для обработки номера статуса ячейки
   * @param status - number. Номер статуса
   */
  getCellsStatusText(status: number): string {
    switch (status) {
      case 0: {
        return 'Свободна';
      }
      case 1: {
        return 'Занята товаром';
      }
      case 2: {
        return 'В работе';
      }
      case 3: {
        return 'Забронирована';
      }
      case 4: {
        return 'Зарезервирована';
      }
      case 5: {
        return 'Ожидает ID клиента';
      }
      case 6: {
        return 'Товар забрали';
      }
      case 7: {
        return 'Возврат товара';
      }
      default: {
        return null;
      }
    }
  }
}
