import { createId } from '@paralleldrive/cuid2';
import { Prisma } from '@prisma/client';
import QRCode from 'qrcode';
import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { db } from 'src/lib/db';
import Sentry from 'src/lib/sentry';

export const qrCode: QueryResolvers['qrCode'] = ({ id }) => {
    return db.qrCode.findUnique({
        where: { id },
    });
};

export const scannedQrCode: QueryResolvers['qrCode'] = async ({ id }) => {
    const qrCode = await db.qrCode.findUnique({
        where: { id },
    });

    if (!qrCode) {
        return null;
    }

    try {
        await db.qrCode.update({
            data: {
                usageCount: qrCode.usageCount + 1,
            },
            where: { id },
        });
    } catch (error) {
        Sentry.captureException(error);

        throw new Error('Failed to update usage count');
    }

    return qrCode;
};

export const createQrCode: MutationResolvers['createQrCode'] = async ({
    input,
}) => {
    const id = createId();
    const code = await QRCode.toDataURL(input.redirectUrl, {});

    const defaultOptions: PrismaJson.QRCodeMetadata = {
        scale: 10, // 3 to 12
        margin: 1, // 1 to 4
        version: 5, // 4 to 10,
        color: {
            dark: '#000', // black
            light: '#fff', // white
        },
    };

    const metadata = {
        ...defaultOptions,
        ...input.metadata,
    };

    const qrCode = await db.qrCode.create({
        data: {
            ...input,
            code,
            usageCount: 0,
            metadata: metadata as Prisma.JsonObject,
            id,
        },
    });

    return qrCode;
};

export const updateQrCode: MutationResolvers['updateQrCode'] = ({
    id,
    input,
}) => {
    return db.qrCode.update({
        data: removeNulls(input),
        where: { id },
    });
};

export const deleteQrCode: MutationResolvers['deleteQrCode'] = async ({
    id,
}) => {
    const deleteQrCodePromise = db.qrCode.delete({
        where: { id },
    });

    const deleteQrCodeFromGalleryPromise = db.gallery.updateMany({
        where: { qrCodeId: id },
        data: {
            qrCodeId: null,
            qrCode: null,
        },
    });

    const [deleteQrCodeResponse] = await db.$transaction([
        deleteQrCodePromise,
        deleteQrCodeFromGalleryPromise,
    ]);

    return deleteQrCodeResponse;
};
