import React, { useState } from 'react';

import { Container } from '@chakra-ui/react';

import { useAuth } from 'src/auth';
import CreateAssetModal from 'src/components/Gallery/components/ImagesTab/components/CreateAssetModal';
import { useCreateAssets } from 'src/components/Gallery/hooks/useCreateAssets';
import Pagination from 'src/components/Pagination';
import { useQueryControls } from 'src/pages/GalleryPage/hooks/useQueryControls';

import { useControlMediaAssetModel } from '../hooks/useControlMediaAssetModel';
import {
    DEFAULT_MEDIA_PAGINATION_OFFSET,
    useGetMediaAssets,
} from '../hooks/useGetMediaAssets';

import AssetsLoader from './AssetsLoader';
import MediaAssetModal from './MediaAssetModal';
import MediaLibraryAssetSelection from './MediaLibraryAssetSelection';
import MediaLibraryAssetsGrid from './MediaLibraryAssetsGrid';
import MediaLibraryControls from './MediaLibraryControls';
import MediaLibraryHeading from './MediaLibraryHeading';
import MediaLibraryInfoAlert from './MediaLibraryInfoAlert';
import MediaLibraryNoAssetsFound from './MediaLibraryNoAssetsFound';

const MediaScreen = () => {
    const { currentUser } = useAuth();

    const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

    const { mediaLibrary, loading } = useGetMediaAssets();
    const { currentAsset, modalDisclosure, setCurrentAsset } =
        useControlMediaAssetModel();

    const maxFiles = mediaLibrary ? mediaLibrary.maxAllowedAssets : 0;
    const maxFilesRemaining = mediaLibrary
        ? maxFiles - mediaLibrary.assets.totalCount
        : 0;
    const filesCurrentlyUploaded = maxFiles - maxFilesRemaining;
    const noFilesRemaining = maxFilesRemaining <= 0;

    const accept = 'image/*, video/*, application/pdf';
    const assetManager = useCreateAssets({
        gcloudPath: `media/${currentUser?.weddingId}`,
        mediaLibraryId: currentUser?.wedding?.mediaLibrary?.id,
        accept,
        maxFiles: maxFilesRemaining,
        // This is always present when logged in and to access this page you need to be logged in
        weddingId: currentUser?.weddingId ?? '',
    });

    const {
        offset,
        currentPage,
        setCurrentPage,
        totalPages,
        searchQuery,
        setSearchQuery,
        searchInputRef,
        resetSearchQuery,
    } = useQueryControls();

    const maxImages = Math.min(
        currentPage * DEFAULT_MEDIA_PAGINATION_OFFSET,
        mediaLibrary?.assets.count ?? 0
    );

    const hasAssets =
        mediaLibrary?.assets && mediaLibrary?.assets?.items?.length > 0;
    const allIsSelected =
        selectedAssets.length === mediaLibrary?.assets?.items?.length;

    const handleSelectAsset = (
        event:
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
            | React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string
    ) => {
        event.preventDefault();
        event.stopPropagation();
        if (selectedAssets.includes(id)) {
            setSelectedAssets((prev) =>
                prev.filter((assetId) => assetId !== id)
            );
        } else {
            setSelectedAssets((prev) => [...prev, id]);
        }
    };

    return (
        <>
            <Container mt={4}>
                <MediaLibraryHeading
                    assetManager={assetManager}
                    noFilesRemaining={noFilesRemaining}
                />
                <MediaLibraryControls
                    mediaLibrary={mediaLibrary}
                    searchQuery={searchQuery}
                    resetSearchQuery={resetSearchQuery}
                    searchInputRef={searchInputRef}
                    setSearchQuery={setSearchQuery}
                    setSelectedAssets={setSelectedAssets}
                    allIsSelected={allIsSelected}
                />
                <MediaLibraryInfoAlert
                    maxFilesRemaining={maxFilesRemaining}
                    mediaLibrary={mediaLibrary}
                    noFilesRemaining={noFilesRemaining}
                    filesCurrentlyUploaded={filesCurrentlyUploaded}
                />

                <MediaLibraryAssetSelection
                    selectedAssets={selectedAssets}
                    setSelectedAssets={setSelectedAssets}
                    type="media"
                />

                <AssetsLoader loading={loading} />
                <MediaLibraryNoAssetsFound
                    hasAssets={hasAssets}
                    loading={loading}
                    searchQuery={searchQuery}
                />

                <MediaLibraryAssetsGrid
                    mediaLibrary={mediaLibrary}
                    setCurrentAsset={setCurrentAsset}
                    modalDisclosure={modalDisclosure}
                    handleSelectAsset={handleSelectAsset}
                    selectedAssets={selectedAssets}
                    hasAssets={hasAssets}
                    assetManager={assetManager}
                    loading={loading}
                    searchQuery={searchQuery}
                />
                {mediaLibrary && mediaLibrary.assets.count > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        pages={totalPages}
                        setCurrentPage={setCurrentPage}
                        subPagination={{
                            totalCount: mediaLibrary.assets.count,
                            end: maxImages,
                            start: offset + 1,
                        }}
                    />
                )}
            </Container>
            <MediaAssetModal {...modalDisclosure} currentAsset={currentAsset} />
            <CreateAssetModal
                assetManager={assetManager}
                accept={accept}
                maxFiles={maxFilesRemaining}
            />
        </>
    );
};

export default MediaScreen;
