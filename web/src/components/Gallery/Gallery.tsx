import React, { useEffect } from 'react';

import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useToast,
} from '@chakra-ui/react';

import { navigate, routes, useLocation } from '@redwoodjs/router';

import { useAuth } from 'src/auth';
import Loader from 'src/components/Loader';
import { generateURL } from 'src/helpers/generateURL/generateURL';
import { useIsDevice } from 'src/hooks/useIsDevice';
import { useHeroContext } from 'src/layouts/AppLayout/components/AppContentWrapper';
import { useQueryControls } from 'src/pages/GalleryPage/hooks/useQueryControls';

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
    const { currentUser } = useAuth();
    const toast = useToast();
    const [selectedAssets, setSelectedAssets] = React.useState<string[]>([]);

    const { setCurrentPage } = useQueryControls();

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

        const isNotHisGallery = gallery.weddingId !== currentUser?.weddingId;
        if (isNotHisGallery) {
            navigate(routes.dashboard());
            toast({
                title: 'Je hebt geen toegang tot deze galerij',
                status: 'error',
            });
        }
    }, [gallery, currentUser, toast]);

    useEffect(() => {
        if (!gallery) return;

        setHeroData?.({
            title: gallery?.name,
            subtitle: 'Jouw unieke momenten vastgelegd op beeld',
            url:
                gallery.bannerImage?.asset.url ??
                gallery?.assets?.items?.[0]?.url,
            previewUrl:
                gallery.bannerImage?.asset.previewUrl ??
                gallery?.assets?.items?.[0]?.previewUrl,
            fileType:
                gallery.bannerImage?.asset.fileType ??
                gallery?.assets?.items?.[0]?.fileType ??
                'image',
            objectPosition: gallery.bannerImage?.metadata
                ? `${gallery.bannerImage?.metadata?.focalPoint?.x}% ${gallery.bannerImage?.metadata?.focalPoint?.y}%`
                : 'center',
        });
    }, [gallery, gallery?.assets, gallery?.name, setHeroData]);

    if (!gallery && !loading) {
        navigate(routes.galleries());
        toast({
            title: 'Galerij niet gevonden',
            status: 'error',
        });
    }

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

    const allIsSelected =
        selectedAssets.length === gallery?.assets?.items?.length;

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
                    <Container display="flex">
                        <Tab>{`Foto's`}</Tab>
                        <Tab>QR-Code</Tab>
                        <Tab>Settings</Tab>
                    </Container>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Container>
                            {!gallery && loading && <Loader />}
                            {gallery && !loading && (
                                <ImagesTab
                                    handleSelectAsset={handleSelectAsset}
                                    selectedAssets={selectedAssets}
                                    allIsSelected={allIsSelected}
                                    setSelectedAssets={setSelectedAssets}
                                    gallery={gallery}
                                />
                            )}
                        </Container>
                    </TabPanel>
                    <TabPanel>
                        <Container>
                            {!gallery && loading && <Loader />}
                            {gallery && !loading && <QRCodeTab />}
                        </Container>
                    </TabPanel>
                    <TabPanel>
                        <Container>
                            {!gallery && loading && <Loader />}
                            {gallery && !loading && (
                                <SettingsTab gallery={gallery} />
                            )}
                        </Container>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default Gallery;
