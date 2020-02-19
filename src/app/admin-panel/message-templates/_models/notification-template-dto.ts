import {NotificationTemplateStatus} from './notification-template-status';

export interface NotificationTemplateDto {
    id: string;
    /**
     * Шаблон уведомления
     */
    message: string;
    /**
     * Статус ячейки, при котором производится отправка уведомления
     */
    status: NotificationTemplateStatus;
    /**
     * Описание шаблона
     */
    description: string;
}
