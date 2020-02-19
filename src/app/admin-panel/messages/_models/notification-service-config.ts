import {NotificationStatus} from './notification-status';

export interface NotificationServiceConfig {
    id: string;
    /**
     * Включить уведомления по изменению статуса доставки
     */
    isEnable: boolean;
    /**
     * Логин для стороннего сервиса уведомлений
     */
    clientsNotificationServiceLogin: string;
    /**
     * Пароль для стороннего сервиса уведомлений
     */
    clientsNotificationServicePass: string;
    /**
     * Адрес стороннего сервиса уведомлений
     */
    serviceUrl: string;
    /**
     * Таймаут запроса [мс]
     */
    requestTimeout: number;
    /**
     * Автоматически проверяемые статусы отправленных сообщений
     */
    automaticalyCheckedStatuses: NotificationStatus[];
    /**
     * Период автоматической проверки статусов отправленных сообщений (рекомендуется 60000) [мс]
     */
    automaticStatusCheckPeriod: number;
    /**
     * Задержка между запросами на сервер отправки сообщений (рекомендуется 60000) [мс]
     */
    delayBetweenRequests: number;
    /**
     * Пауза в запросах при получении кода ошибки 4 (IP Заблокирован) [минут]
     */
    pauseOnIpBlockedErrorInMinutes: number;
    /**
     * Пауза в запросах при получении кода ошибки 9 (Слишком частые запросы) [минут]
     */
    pauseOnManyRequestsErrorInMinutes: number;
}
