import { useEffect } from 'react';

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
    const { tab } = useParams();

    const { landingPageId } = useParams();
    const { weddingRsvpLandingPage, loading } = useGetWeddingRsvpLandingPage();

    const tabs = {
        Settings: 'Settings',
        Studio: 'Studio',
        Preview: 'Preview',
        QrCode: 'Qr Code',
    };

    const { tabIndex, handleTabChange } = useControlledTabs({
        tabs: Object.values(tabs),
        navigationCallback: (tab) => {
            if (!landingPageId) return;
            const urlInfo = generateURL(location.pathname, location.search);
            const queryParams = urlInfo.queryParams;

            if (tab !== tabs.Studio) {
                Object.keys(queryParams).forEach((key) => {
                    if (key !== 'tab') {
                        delete queryParams[key];
                    }
                });
            }

            navigate(
                routes.rsvpLandingPageStudio({
                    landingPageId,
                    tab,
                })
            );
        },
    });

    useEffect(() => {
        if (!tab) return;

        const newIndex: number = Object.values(tabs).indexOf(tab);
        handleTabChange(newIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab]);

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

    const shouldShowHero = tabIndex === 0 || tabIndex === 3;
    const pageBuilderData =
        weddingRsvpLandingPage?.pageBuilderData as Partial<Data>;
    const hasWeddingRsvpLandingPageBuilderData =
        !!pageBuilderData?.content && pageBuilderData.content?.length > 0;

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
                    onChange={handleTabChange}
                    index={tabIndex}
                    position="relative"
                    colorScheme="body"
                    defaultIndex={0}
                    isLazy
                    {...(!isDesktop ? { isFitted: true } : {})}
                >
                    <TabList py={0} position="sticky" top={0} zIndex={2}>
                        {Object.values(tabs).map((tab) => {
                            const isPreviewTab = tab === tabs.Preview;

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
                                            tab == tabs.Preview &&
                                            !hasWeddingRsvpLandingPageBuilderData
                                        }
                                    >
                                        {tab}
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
