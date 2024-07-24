import QRCode from 'qrcode';

declare global {
    namespace PrismaJson {
        type QRCodeMetadata = QRCode.QRCodeToDataURLOptions;
        type AssetReferenceMetadata = {
            focalPoint: {
                x: number;
                y: number;
            };
        };
    }
}

export {};
