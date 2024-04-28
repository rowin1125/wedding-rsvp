import React, { useEffect } from 'react';

import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { navigate, routes, useLocation } from '@redwoodjs/router';

import Loader from 'src/components/Loader';
import { generateURL } from 'src/helpers/generateURL/generateURL';
import { useIsDevice } from 'src/hooks/useIsDevice';
import { useHeroContext } from 'src/layouts/AdminLayout/components/AdminContentWrapper';
import { useGalleryPagination } from 'src/pages/GalleryPage/hooks/useGalleryPagination';

import ImagesTab from './components/ImagesTab';
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
                    id: gallery?.id || '',
                    ...queryParams,
                    tab: tab,
                })
            );
        },
    });

    useEffect(() => {
        setHeroData?.({
            title: gallery?.name,
            subtitle: 'Jouw unieke momenten vastgelegd op beeld.',
            image: gallery?.assets?.items?.[0]?.url ?? '/weddingDrinks.jpg',
            fileType: gallery?.assets?.items?.[0]?.fileType ?? 'image',
        });
    }, [gallery?.assets, gallery?.name, setHeroData]);

    if (!gallery || loading) return <Loader />;

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
                        <ImagesTab gallery={gallery} />
                    </TabPanel>
                    {/* TODO: Build QR-code generator */}
                    <TabPanel>2</TabPanel>
                    <TabPanel>
                        <SettingsTab gallery={gallery} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Gallery;