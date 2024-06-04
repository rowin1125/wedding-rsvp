import React, { useEffect } from 'react';

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { navigate, routes, useLocation } from '@redwoodjs/router';

import Loader from 'src/components/Loader';
import { generateURL } from 'src/helpers/generateURL/generateURL';
import { useIsDevice } from 'src/hooks/useIsDevice';
import { useHeroContext } from 'src/layouts/AppLayout/components/AppContentWrapper';
import { useGalleryPagination } from 'src/pages/GalleryPage/hooks/useGalleryPagination';

import ImagesTab from './components/ImagesTab';
import QRCodeTab from './components/QRCodeTab/QRCodeTab';
import SettingsTab from './components/SettingsTab/SettingsTab';
import { useControlledTabs } from './hooks/useControlledTabs';
import { useFindGallery } from './hooks/useFindGallery';

export const GALLERY_TABS = {
    IMAGES: 'images',
    QR: 'qr',
    SETTINGS: 'settings',
};

const Gallery = () => {
    const { isDesktop } = useIsDevice();
    const { setHeroData } = useHeroContext();
    const location = useLocation();
    const { gallery, loading } = useFindGallery();
    const { setCurrentPage } = useGalleryPagination();

    const { tabIndex, handleTabChange } = useControlledTabs({
        tabs: Object.values(GALLERY_TABS),
        navigationCallback: (tab) => {
            if (!gallery) return;
            const urlInfo = generateURL(location.pathname, location.search);
            const queryParams = urlInfo.queryParams;

            if (tab !== GALLERY_TABS.IMAGES) {
                Object.keys(queryParams).forEach((key) => {
                    if (key !== 'tab') {
                        delete queryParams[key];
                    }
                });
            }
            setCurrentPage(1);

            navigate(
                routes.gallery({
                    galleryId: gallery?.id || '',
                    ...queryParams,
                    tab: tab,
                })
            );
        },
    });

    useEffect(() => {
        if (!gallery) return;

        setHeroData?.({
            title: gallery?.name,
            subtitle: 'Jouw unieke momenten vastgelegd op beeld',
            image:
                gallery?.assets?.items?.[0]?.url ??
                'https://images.prismic.io/derow-v1/ZjZskEMTzAJOCiHL_weddingDrinks.jpg?auto=format,compress',
            previewUrl: gallery?.assets?.items?.[0]?.previewUrl,
            fileType: gallery?.assets?.items?.[0]?.fileType ?? 'image',
        });
    }, [gallery, gallery?.assets, gallery?.name, setHeroData]);

    return (
        <Box>
            <Tabs
                onChange={handleTabChange}
                index={tabIndex}
                position="relative"
                colorScheme="body"
                defaultIndex={0}
                isLazy
                {...(!isDesktop ? { isFitted: true } : {})}
            >
                <TabList position="sticky" top={0} zIndex={2}>
                    <Tab>{`Foto's`}</Tab>
                    <Tab>QR-Code</Tab>
                    <Tab>Settings</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        {!gallery && loading && <Loader />}
                        {gallery && !loading && <ImagesTab gallery={gallery} />}
                    </TabPanel>
                    <TabPanel>
                        {!gallery && loading && <Loader />}
                        {gallery && !loading && <QRCodeTab />}
                    </TabPanel>
                    <TabPanel>
                        {!gallery && loading && <Loader />}
                        {gallery && !loading && (
                            <SettingsTab gallery={gallery} />
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Gallery;
