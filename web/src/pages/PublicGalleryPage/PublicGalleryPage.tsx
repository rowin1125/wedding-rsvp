import { Metadata } from '@redwoodjs/web';

import { DEFAULT_GALLERY_PAGINATION_OFFSET } from '../GalleriesPage/components/GalleryForm/hooks/useGalleryForm';
import { QueryControlsProvider } from '../GalleryPage/hooks/useQueryControls';

import PublicGallery from './components/PublicGallery';

const PublicGalleryPage = () => {
    return (
        <>
            <Metadata title="PublicGallery" description="PublicGallery page" />

            <QueryControlsProvider
                defaultOffset={DEFAULT_GALLERY_PAGINATION_OFFSET}
            >
                <PublicGallery />
            </QueryControlsProvider>
        </>
    );
};

export default PublicGalleryPage;
