import type { GalleryDownloadRequestRelationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const GalleryDownloadRequest: GalleryDownloadRequestRelationResolvers = {
    gallery: (_obj, { root }) => {
        return db.galleryDownloadRequest
            .findUnique({ where: { id: root?.id } })
            .gallery();
    },
};
