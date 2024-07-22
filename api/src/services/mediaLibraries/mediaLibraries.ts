import { Prisma } from '@prisma/client';
import type {
    QueryResolvers,
    MediaLibraryRelationResolvers,
} from 'types/graphql';

import { isUserAssignedToWeddingValidator } from 'src/helpers/isUserAssignedToWeddingValidator';
import { db } from 'src/lib/db';

export const mediaLibrary: QueryResolvers['mediaLibrary'] = async ({ id }) => {
    const mediaLibrary = await db.mediaLibrary.findUnique({
        where: { id },
    });

    if (!mediaLibrary) throw new Error('Media library not found');

    isUserAssignedToWeddingValidator({
        requestWeddingId: mediaLibrary?.weddingId,
    });

    return mediaLibrary;
};

export const DEFAULT_MEDIA_PAGINATION_OFFSET = 1;

export const MediaLibrary: MediaLibraryRelationResolvers = {
    assets: async ({ skip, sortField, sortOrder, take, query }, { root }) => {
        const orderBy: Record<string, string> = {};

        switch (sortField) {
            case 'CREATED_AT':
                orderBy.createdAt = sortOrder?.toLowerCase() || 'desc';
                break;
            case 'FILE_NAME':
                orderBy.originalFilename = sortOrder?.toLowerCase() || 'desc';
                break;
            case 'FILE_TYPE':
                orderBy.fileType = sortOrder?.toLowerCase() || 'desc';
                break;
            default:
                orderBy.createdAt = 'desc';
                break;
        }

        const where: Prisma.AssetWhereInput = {
            mediaLibraryId: root?.id,
            OR: query
                ? [
                      {
                          originalFilename: {
                              contains: query,
                              mode: 'insensitive',
                          },
                      },
                      { fileType: { contains: query, mode: 'insensitive' } },
                      { description: { contains: query, mode: 'insensitive' } },
                      { title: { contains: query, mode: 'insensitive' } },
                      { altText: { contains: query, mode: 'insensitive' } },
                  ]
                : undefined,
        };

        const items = await db.asset.findMany({
            skip: skip ?? 0,
            take: take ?? DEFAULT_MEDIA_PAGINATION_OFFSET,
            orderBy,
            where,
        });

        const totalCount = await db.asset.count({
            where: {
                mediaLibraryId: root?.id,
            },
        });
        const count = await db.asset.count({ where });

        const pages = Math.ceil(
            count / (take ?? DEFAULT_MEDIA_PAGINATION_OFFSET)
        );

        return {
            items,
            count,
            pages,
            totalCount,
        };
    },
    wedding: (_obj, { root }) => {
        return db.mediaLibrary
            .findUnique({ where: { id: root?.id } })
            .wedding();
    },
};
