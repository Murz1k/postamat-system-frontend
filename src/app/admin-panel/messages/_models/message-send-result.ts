export enum MessageSendResult {
    NoError = 0,
    RequestParametersError = 1,
    WrongCredentials = 2,
    NotEnoughtMoney = 3,
    IpBlocked = 4,
    WrongDateFormat = 5,
    MessageProhibited = 6,
    WrongPhoneFormat = 7,
    MessageCannotBeDelivered = 8,
    TooManyRequests = 9,
    Queue = -100
}
