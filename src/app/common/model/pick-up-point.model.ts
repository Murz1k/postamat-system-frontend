import {Cell} from './cell.model';

export class PickUpPoint {
  public id: string;
  public name: string;
  public location: string;
  public ip: string;
  public port: number;
  public lastOnlineTime: string;
  public isOnline: boolean;
}

export class PickUpPointAccessDto {
  id: string;
  name: string;
  isAccess: boolean;

  static getPermissionInformation(id: string, pickUpPointIdxList: Array<string>) {
    return pickUpPointIdxList.includes(id);
  }
}

export class PostamatsAndCells {
  pickUpPoint: PickUpPoint;
  isCells: boolean;
  cells?: Cell[];
}
