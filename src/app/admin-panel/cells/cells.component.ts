import {Component, OnInit} from '@angular/core';
import {PickUpPointService} from '../../common/service/pick-up-point.service';
import {Observable} from 'rxjs';
import {PickUpPoint, PickUpPointAccessDto, PostamatsAndCells} from '../../common/model/pick-up-point.model';
import {MaterialService} from '../../common/material.service';
import {CellService} from '../../common/service/cell.service';
import {Cell} from '../../common/model/cell.model';
import {CellsOperationsAuthorizationDto} from '../../common/model/user.model';

@Component({
  selector: 'app-cells',
  templateUrl: './cells.component.html',
  styleUrls: ['./cells.component.scss']
})
export class CellsComponent implements OnInit {

  postamats$: Observable<PickUpPoint[]>;
  postamats: PickUpPoint[] = [];
  postamatsList: PickUpPointAccessDto[] = [];
  postamatsAndCells: PostamatsAndCells[] = [];
  postamatsQuantity = 0;
  isPostamatsListLoaded = false;
  isResponseFail = false;

  usersCellsAccess: CellsOperationsAuthorizationDto;

  constructor(private pupService: PickUpPointService,
              private cellService: CellService) {
  }

  ngOnInit() {
    this.usersCellsAccess = JSON.parse(localStorage.getItem('currentUser')).cellsOperationsAuthorization;
    this.getAllPostamats();
  }

  async getAllPostamats() {
    this.isPostamatsListLoaded = false;
    this.isResponseFail = false;
    this.postamats$ = await this.pupService.getAllPickUpPoints();
    this.postamats$.subscribe(
        (p: PickUpPoint[]) => {
          if (p) {
            p.forEach((el) => {
              const postamat: PickUpPointAccessDto = {
                id: el.id,
                name: el.name,
                isAccess: false
              };
              this.postamatsList.push(postamat);
              this.postamats.push(el);
            });
          }
          this.isPostamatsListLoaded = true;
        },
        error => {
          MaterialService.toast(`Ошибка '${error.name}'`);
          this.isPostamatsListLoaded = true;
          this.isResponseFail = true;
        }
    );
  }

  choosePostamats() {
    this.postamatsQuantity = this.checkPostamatsIsAccess().length;
    this.postamatsAndCells = [];
    this.postamatsList.forEach((el) => {
      if (el.isAccess) {
        const idx = this.postamats.findIndex(p => p.id === el.id);
        this.cellService.getCellsFromOnePickUpPoint(el.id)
            .subscribe(
                x => this.getCellsInfoFronCurrentPostamats(this.postamats[idx], 200, x),
                () => this.getCellsInfoFronCurrentPostamats(this.postamats[idx], 500));
      }
    });
  }

  getCellsInfoFronCurrentPostamats(pickUpPoint: PickUpPoint, res: number, cells?: Cell[]) {
    if (res === 200) {
      const isCells = true;
      this.postamatsAndCells.push({pickUpPoint, isCells, cells});
    }

    if (res === 500) {
      const isCells = false;
      this.postamatsAndCells.push({pickUpPoint, isCells});
    }
    setTimeout(() => {
      MaterialService.initCollapsible();
      this.postamatsQuantity--;
    }, 200);
  }

  cellTextStatus(status: string) {
    return this.cellService.getCellsStatusText(parseInt(status, 10));
  }

  checkPostamatsIsAccess() {
    const arr = this.postamatsList.map(x => x.isAccess);
    return arr.filter(i => i === true);
  }

}
