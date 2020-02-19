export class Cell {
  public isEnable: boolean;
  public isClose: boolean;
  public lockAddress: string;
  public size: string;
  public openPriority: number;
  public status: string;
  public clientId: string;
  public barCode: string;
  public returnDt: string;
  public reservedDt: string;
  public loadDt: string;
  public unLoadDt: string;
  public lastModifyDt: string;
  public pinCode: number;
  public servicePinCode: number;
  public quanProd: number;
  public products: Array<string>;
}

export class WaitLoadItemsDto {
  public postomatId: string;
  public reserveItem: WaitLoadItem;
}

export class WaitLoadItem {
  public clientId: string;
  public packBarCode: string;
  public cellSize: string;
  public createDt: string;
}

export class ReserveItemDto {
  public postomatId: string;
  public reserveItem: ReserveItem;
}

export class ReserveItem {
  public size: string;
  public clientId: string;
}

export class OpenLockItemDto {
  public postomatId: string;
  public openLockItem: OpenLockItem;
}

export class OpenLockItem {
  public lockCode: string;
}

export class OpenLockResultDto {
  public result: OpenLockResultEnum;

  static getDescription(response: number): string {
    switch (response) {
      case 0: {
        return 'Замок с таким кодом не найден';
      }
      case 1: {
        return 'Таймаут открытия замка (датчик закрытия замкнут)';
      }
      case 2: {
        return 'Ячейка открыта';
      }
      case 3: {
        return 'Ошибка запроса';
      }
      default: {
        return 'Ошибка';
      }
    }
  }
}

export enum OpenLockResultEnum {
  'NotFound', 'Error', 'Success', 'WrongRequest'
}

