import { Metadata } from '@redwoodjs/web';

import { GalleryPaginationProvider } from '../GalleryPage/hooks/useGalleryPagination';

import PublicGallery from './components/PublicGallery';

const PublicGalleryPage = () => {
    return (
        <>
            <Metadata title="PublicGallery" description="PublicGallery page" />

            <GalleryPaginationProvider>
                <PublicGallery />
            </GalleryPaginationProvider>
        </>
    );
};

export default PublicGalleryPage;
