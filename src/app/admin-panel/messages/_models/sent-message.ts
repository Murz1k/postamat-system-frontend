import {NotificationStatus} from './notification-status';
import {MessageSendResult} from './message-send-result';

export interface SentMessage {
    id: string;
    /**
     * Идентификатор сообщения на сервисе
     */
    messageId: number;
    /**
     * Телефон отправки
     */
    phoneNumber: string;
    message: string;
    /**
     * Статус отправки сообщения на сервис
     */
    sendResult: MessageSendResult;
    /**
     * Статус сообщения
     */
    status: NotificationStatus;
    /**
     * Время регистрации сообщения в очередь на отправку
     */
    registeredTimestamp: number;
    /**
     * Время отправки сообщения в сервис
     */
    sendingTimeStamp: number;
    /**
     * Время последнего изменения статуса
     */
    lastChangeStatusTimestamp: number;
    /**
     * Время регистрации сообщения в очередь на
     */
    readonly registeredTimestampJsTicks: number;
    /**
     * Время отправки сообщения в сервис
     */
    readonly sendingTimeStampJsTicks: number;
    /**
     * Время регистрации сообщения в очередь на отправку
     */
    readonly lastChangeStatusTimestampJsTicks: number;
}
