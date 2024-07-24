import type { AssetReferenceRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

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
};
