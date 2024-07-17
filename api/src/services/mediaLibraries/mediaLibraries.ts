import { Prisma } from '@prisma/client';
import type {
    QueryResolvers,
    MediaLibraryRelationResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const mediaLibrary: QueryResolvers['mediaLibrary'] = ({ id }) => {
    return db.mediaLibrary.findUnique({
        where: { id },
    });
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
                  ]
                : undefined,
        };

        const items = await db.asset.findMany({
            skip: skip ?? 0,
            take: take ?? DEFAULT_MEDIA_PAGINATION_OFFSET,
            orderBy,
            where,
        });

        const count = await db.asset.count({ where });

        const pages = Math.ceil(
            count / (take ?? DEFAULT_MEDIA_PAGINATION_OFFSET)
        );

        return {
            items,
            count,
            pages,
        };
    },
    wedding: (_obj, { root }) => {
        return db.mediaLibrary
            .findUnique({ where: { id: root?.id } })
            .wedding();
    },
};
