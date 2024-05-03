import QRCode from 'qrcode';

declare global {
    namespace PrismaJson {
        type QRCodeMetadata = QRCode.QRCodeToDataURLOptions;
    }
}

export {};
