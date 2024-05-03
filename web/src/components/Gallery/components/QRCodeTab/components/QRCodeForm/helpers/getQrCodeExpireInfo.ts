import { FindQrCodeById } from 'types/graphql';

type GetQrCodeExpireInfoOptions = {
    expiredExceptedRange: number;
};

export const getQrCodeExpireInfo = (
    qrCode: FindQrCodeById['qrCode'],
    options?: GetQrCodeExpireInfoOptions
) => {
    const dayMultiplier = 1000 * 60 * 60 * 24;
    const range = (options?.expiredExceptedRange ?? 14) * dayMultiplier;

    const isWithinExpireRange =
        qrCode?.expiresAt &&
        new Date(qrCode.expiresAt).getTime() - new Date().getTime() < range;
    const isExpired =
        qrCode?.expiresAt &&
        new Date(qrCode.expiresAt).getTime() < new Date().getTime();

    return {
        isWithinExpireRange,
        isExpired,
    };
};
