/**
 * Сервис для получаения данных о постамате с REST API
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

import {RestService} from './rest.service';

import {PickUpPoint} from '../model/pick-up-point.model';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PickUpPointService extends RestService {

    PickUpPointUri: string;

    private _postamates: PickUpPoint[] = [];

    constructor(public http: HttpClient) {
        super(http);
        this.PickUpPointUri = 'Postomats';
    }

    /**
     * Метод получения списка постаматов
     * @returns [{Observable}]
     */
    getAllPickUpPoints(): Observable<PickUpPoint[]> {
        if (this._postamates.length) {
            return of(this._postamates);
        }
        return this.getMethod<PickUpPoint[]>(this.PickUpPointUri).pipe(tap(postamates => this._postamates = postamates));
    }

    /**
     * Метод добавления нового постамата
     * @param data - PickUpPoint. Модель данных нового постамата
     * @returns [{Observable}]
     */
    addPickUpPoint(data: PickUpPoint): Observable<PickUpPoint> {
        return this.postMethod<PickUpPoint>(this.PickUpPointUri, data);
    }

    /**
     * Метод обновления информации постамата по гуиду
     * @param data - PickUpPoint. Модель данных измененного постамата
     * @returns [{Observable}]
     */
    updatePickUpPoint(data: PickUpPoint): Observable<PickUpPoint> {
        return this.putMethod<PickUpPoint>(this.PickUpPointUri, data);
    }

    /**
     * Метод удаления постамата по гуиду
     * @param id - string. Гуид постамата
     * @returns [{Observable}]
     */
    deletePickUpPoint(id: string): Observable<PickUpPoint> {
        return this.deleteMethod<PickUpPoint>(this.PickUpPointUri, id);
    }
}
