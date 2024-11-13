import { useEffect, useMemo } from 'react';

import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Collapse,
    useToast,
    Tooltip,
} from '@chakra-ui/react';
import { Data } from '@measured/puck';

import { navigate, routes, useParams } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import { useControlledTabs } from 'src/components/Gallery/hooks/useControlledTabs';
import Hero from 'src/components/Hero';
import { useControlHero } from 'src/components/Hero/hooks/useControlHero';
import PuckStudio from 'src/components/PuckStudio/PuckStudio';
import { generateURL } from 'src/helpers/generateURL/generateURL';
import { capitalizeText } from 'src/helpers/textHelpers/capitalizeText/capitalizeText';
import { useIsDevice } from 'src/hooks/useIsDevice';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import { useGetWeddingRsvpLandingPage } from '../RsvpLandingsPage/hooks/useGetWeddingRsvpLandingPage';
import { useUpdateWeddingRsvpStudioData } from '../RsvpLandingsPage/hooks/useUpdateWeddingRsvpStudioData';

import RsvpLandingPageConfigTab from './components/RsvpLandingPageConfigTab';
import RsvpLandingPageQrTab from './components/RsvpLandingPageQrTab';

const RsvpLandingPageStudioPage = () => {
    const { isDesktop } = useIsDevice();
    const { onSubmit, loading: updateLoading } =
        useUpdateWeddingRsvpStudioData();
    const toast = useToast();

    const { landingPageId, studioTab } = useParams();
    const { weddingRsvpLandingPage, loading } = useGetWeddingRsvpLandingPage();

    const tabs = {
        settings: 'settings',
        studio: 'studio',
        preview: 'preview',
        qrcode: 'qrcode',
    };

    const { heroData, setHeroData } = useControlHero({
        initialValues: {
            title: 'Onze bruiloft',
            subtitle:
                'We kijken er naar uit om jullie te zien op onze bruiloft',
            url: 'https://images.prismic.io/derow-v1/ZjZskEMTzAJOCiHL_weddingDrinks.jpg?auto=format,compress',
            fileType: 'image',
        },
    });

    useEffect(() => {
        if (!weddingRsvpLandingPage && !loading) {
            navigate(routes.rsvpLandings(), { replace: true });
            toast({
                title: 'Er is iets fout gegaan',
                description: 'Er is geen landing page gevonden',
                status: 'error',
            });
        }
    }, [weddingRsvpLandingPage, loading, toast]);

    const shouldShowHero = studioTab === 'settings' || studioTab === 'qrcode';
    const currentIndex = useMemo(() => {
        return Object.values(tabs).findIndex((tab) => tab === studioTab);
    }, [studioTab])
    const pageBuilderData =
        weddingRsvpLandingPage?.pageBuilderData as Partial<Data>;
    const hasWeddingRsvpLandingPageBuilderData =
        !!pageBuilderData?.content && pageBuilderData.content?.length > 0;

    const handleTabChange = (index: number) => {
        if (!landingPageId) return;
        const tab = Object.values(tabs)[index];


        navigate(
            routes.rsvpLandingPageStudio({
                landingPageId,
                studioTab: tab,
            }),

        );
    }

    return (
        <>
            <Metadata
                title="Rsvp landingspagina editor"
                description="RsvpLandingPageBuilder page"
            />
            <Collapse in={shouldShowHero} animateOpacity>
                <Hero color="white" {...heroData} />
            </Collapse>

            <AppContentWrapper pt={0} setHeroData={setHeroData}>
                <Tabs
                    index={currentIndex}
                    position="relative"
                    colorScheme="body"
                    defaultIndex={0}
                    isLazy
                    {...(!isDesktop ? { isFitted: true } : {})}
                >
                    <TabList py={0} position="sticky" top={0} zIndex={2}>
                        {Object.values(tabs).map((tab, index) => {
                            const isPreviewTab = tab === tabs.preview;

                            return (
                                <Tooltip
                                    label="Je hebt nog geen data ingevuld om de preview te bekijken"
                                    key={tab}
                                    isDisabled={
                                        !isPreviewTab ||
                                        hasWeddingRsvpLandingPageBuilderData
                                    }
                                >
                                    <Tab
                                        minW={{
                                            lg: '200px',
                                        }}
                                        key={tab}
                                        isDisabled={
                                            tab == tabs.preview &&
                                            !hasWeddingRsvpLandingPageBuilderData
                                        }
                                        onClick={() => handleTabChange(index)}
                                    >
                                        {capitalizeText(tab)}
                                    </Tab>
                                </Tooltip>
                            );
                        })}
                    </TabList>

                    <TabPanels>
                        <RsvpLandingPageConfigTab
                            loading={loading}
                            weddingRsvpLandingPage={weddingRsvpLandingPage}
                        />
                        <TabPanel p={0}>
                            {weddingRsvpLandingPage && (
                                <PuckStudio
                                    initialData={
                                        weddingRsvpLandingPage.pageBuilderData as Partial<Data>
                                    }
                                    onPublish={onSubmit}
                                    isLoading={updateLoading || loading}
                                    isActive={weddingRsvpLandingPage.isActive}
                                />
                            )}
                        </TabPanel>
                        <TabPanel p={0}>
                            {weddingRsvpLandingPage && (
                                <PuckStudio
                                    initialData={
                                        weddingRsvpLandingPage.pageBuilderData as Partial<Data>
                                    }
                                    renderView
                                    isLoading={updateLoading}
                                />
                            )}
                        </TabPanel>
                        <TabPanel>
                            <RsvpLandingPageQrTab
                                weddingRsvpLandingPage={weddingRsvpLandingPage}
                                loading={loading}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </AppContentWrapper>
        </>
    );
};

export default RsvpLandingPageStudioPage;
