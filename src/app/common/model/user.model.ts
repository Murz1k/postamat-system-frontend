export class User {
    public id: string;
    public name: string;
    public role: number;
    public description?: string;
    public cellsOperationsAuthorization?: number;
    public authorizedPostomats?: Array<string>;

    static getUserErrorMessage(reject, method?: string): string {
        switch (reject.status) {
            case 400: {
                if (method === 'newUser') {
                    return 'Не верные данные нового пользователя';
                }
                if (method === 'deleteUser') {
                    return 'Данного пользователя не существует';
                }
                if (method === 'updateUser' || method === 'setNewPass') {
                    return 'Не верные данные пользователя';
                }
                break;
            }
            case 401: {
                return 'Не авторизован';
            }
            case 403: {
                return 'Недостаточно прав для совершения данной операции';
            }
            case 406: {
                return 'Не верный старый пароль';
            }
            case 409: {
                return 'Имя пользователя занято';
            }
            case 500: {
                return 'Внутренняя ошибка сервера, или ошибка доступа к данным';
            }
            default: {
                return `Ошибка! ${reject.message}`;
            }
        }
    }

    static getUserResultMessage(method: string): string {
        switch (method) {
            case 'newUser': {
                return 'Новый пользователь добавлен';
            }
            case 'deleteUser': {
                return 'Пользователь удален';
            }
            case 'updateUser': {
                return 'Информация о пользователей обновлена';
            }
            case 'setNewPass': {
                return 'Новый пароль установлен';
            }
            case 'updateUserCellAuth': {
                return 'Разрешаемые действия пользователя по ячейкам изменены';
            }

            case 'updateUserPostamatAuth': {
                return 'Список разрешенных постаматов обновлен';
            }
            default: {
                return null;
            }
        }
    }
}

export class UserRoles {
    public role: number;
    public description: string;

    static getUserRolesDescription() {
        return [{
            role: 100,
            description: 'Оператор'
        }, {
            role: 200,
            description: 'Поддержка'
        }, {
            role: 300,
            description: 'Администратор'
        }, {
            role: 400,
            description: 'Супер администратор'
        }];
    }
}

export class SetNewPasswordDto {
    public userId: string;
    public oldPassword: string;
    public newPassword: string;
}

export class UserRegistration {
    public id: string;
    public name: string;
    public password: string;
    public role: number;
    public description: string;
}

export class Roles {
    public role: number;
    public description: string;
}

export class AuthorizedPostomatsDto {
    public userId: string;
    public postomatGuids: Array<string>;
}

export class CellsOperationsAuthorizationDto {
    public isAllowOpenCell: boolean;
    public isShowPinCode: boolean;
    public isAllowAddWaitLoadItems: boolean;
    public isAllowReserveForReturn: boolean;
}
