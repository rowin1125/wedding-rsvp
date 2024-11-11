import type { Prisma } from '@prisma/client';
import type {
    AssetReferenceRelationResolvers,
    MutationResolvers,
    QueryResolvers,
} from 'types/graphql';

import { removeNulls } from '@redwoodjs/api';

import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';

export const assetReference: QueryResolvers['assetReference'] = ({ id }) => {
    return db.assetReference.findUnique({ where: { id } });
};

export const createAssetReference: MutationResolvers['createAssetReference'] =
    async ({
        input: { assetId, metadata, weddingRsvpLandingPageId, objectReference },
    }) => {
        const asset = await db.asset.findUnique({
            where: {
                id: assetId,
            },
        });

        if (!asset) {
            throw new Error('Asset not found');
        }

        isUserAssignedToWeddingValidator({
            requestWeddingId: asset.weddingId,
            message: 'You are not allowed to create an asset reference',
        });

        const objectReferenceExists = await db.assetReference.findFirst({
            where: {
                objectReference,
            },
        });

        if (objectReferenceExists) {
            await db.assetReference.deleteMany({
                where: {
                    objectReference,
                },
            });
        }

        return db.assetReference.create({
            data: {
                asset: { connect: { id: assetId } },
                metadata: metadata
                    ? removeNulls(metadata as Prisma.JsonObject)
                    : {},
                weddingRsvpLandingPage: weddingRsvpLandingPageId
                    ? { connect: { id: weddingRsvpLandingPageId } }
                    : undefined,
                objectReference,
            },
            include: {
                asset: true,
            },
        });
    };

export const deleteAssetReference: MutationResolvers['deleteAssetReference'] =
    async ({ id, objectReference }) => {
        const assetRef = await db.assetReference.findUnique({
            where: {
                id,
            },
            include: {
                asset: {
                    select: {
                        weddingId: true,
                    },
                },
            },
        });

        if (!assetRef) {
            throw new Error('Asset reference not found');
        }

        isUserAssignedToWeddingValidator({
            requestWeddingId: assetRef.asset.weddingId,
            message: 'You are not allowed to delete an asset reference',
        });

        const assetReferences = await db.assetReference.findMany({
            where: {
                id,
                OR: [
                    {
                        objectReference,
                    },
                ],
            },
        });
        if (!assetReferences) return true;

        await db.assetReference.deleteMany({
            where: {
                id,
                OR: [
                    {
                        objectReference,
                    },
                ],
            },
        });
        return true;
    };

export const AssetReference: AssetReferenceRelationResolvers = {
    asset: (_obj, { root }) => {
        return db.assetReference
            .findUnique({ where: { id: root?.id } })
            .asset();
    },
    galleryReferences: (_obj, { root }) => {
        return db.assetReference
            .findUnique({ where: { id: root?.id } })
            .galleryReferences();
    },
    weddingReferences: (_obj, { root }) => {
        return db.assetReference
            .findUnique({ where: { id: root?.id } })
            .weddingReferences();
    },
    weddingRsvpLandingPage: (_obj, { root }) => {
        return db.assetReference
            .findUnique({ where: { id: root?.id } })
            .weddingRsvpLandingPage();
    },
};
