export interface IGenerate {
    message: string;
    data: IData;
}

interface IData {
    transactionId: string;
    qrcode?: string;
}
