export interface OrderDto {
    id: string;
    /**
     * Поставщик
     */
    supplier: string;
    /**
     * ID заказа
     */
    orderId: string;
    /**
     * Внешний ID заказа
     */
    externalId: string;
    /**
     * ФИО клиента
     */
    customerName: string;
    /**
     * Телефон клиента
     */
    customerPhone: string;
    /**
     * Внешний ID клиента
     */
    customerExternalId: string;
    /**
     * Email клиента
     */
    customerEmail: string;
    /**
     * Адрес доставки клиента
     */
    customerDeliveryAddress: string;
    /**
     * Размер товара (стандарт постомата)
     */
    productSize: string;
    /**
     * Ширина товара [мм]
     */
    productWidth: number;
    /**
     * Высота товара [мм]
     */
    productHeight: number;
    /**
     * Шлубина товара [мм]
     */
    productDepth: number;
    /**
     * Вес товара [кг]
     */
    productWeight: number;
    /**
     * Внешний штрихкод товара
     */
    productExternalBarCode: string;
    /**
     * Штрихкод производителя
     */
    productManufacturerBarCode: string;
    /**
     * Внешнее упаковочное место
     */
    externalPackaging: string;
    /**
     * Тип загрузки в постомат
     */
    postamateUploadType: string;
    /**
     * ID постамата
     */
    postamateId: string;
    /**
     * Артикул
     */
    vendorCode: string;
    /**
     * Производитель
     */
    manufacturer: string;
    /**
     * Наименование товара
     */
    productName: string;
    /**
     * Количество
     */
    quantity: number;
    /**
     * Цена
     */
    price: number;
    /**
     * Сумма
     */
    sum: number;
    /**
     * Страна производитель
     */
    manufacturerCountry: string;
    /**
     * Грузотаможенная декларация
     */
    gtd: string;
    /**
     * Ставка НДС
     */
    vat: number;
    /**
     * Тип оплаты
     */
    paymentType: number;
}
