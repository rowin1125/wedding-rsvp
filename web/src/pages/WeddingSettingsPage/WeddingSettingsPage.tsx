import {
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';

import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import { useControlledTabs } from 'src/components/Gallery/hooks/useControlledTabs';
import Hero from 'src/components/Hero';
import { generateURL } from 'src/helpers/generateURL/generateURL';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import { useIsDevice } from 'src/hooks/useIsDevice';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import { useQueryControls } from '../GalleryPage/hooks/useQueryControls';

import UpdatePartnersForm from './components/UpdatePartnersForm/UpdatePartnersForm';
import UpdateWeddingDayParts from './components/UpdateWeddingDayParts/UpdateWeddingDayParts';
import UpdateWeddingForm from './components/UpdateWeddingForm/UpdateWeddingForm';

export const WEDDING_SETTINGS_TABS = {
    WEDDING: 'wedding',
    PARTNERS: 'partners',
    DAY_PARTS: 'dayParts',
};

const HERO_SUBTITLE_MAP = {
    [WEDDING_SETTINGS_TABS.WEDDING]: 'Bruiloft instellingen',
    [WEDDING_SETTINGS_TABS.PARTNERS]: 'Partners instellingen',
    [WEDDING_SETTINGS_TABS.DAY_PARTS]: 'Dagdelen instellingen',
};

const WeddingSettingsPage = () => {
    const { wedding } = useGetWeddingById();
    const { isDesktop } = useIsDevice();

    const { setCurrentPage } = useQueryControls();

    const { tabIndex, handleTabChange, currentTab } = useControlledTabs({
        tabs: Object.values(WEDDING_SETTINGS_TABS),
        navigationCallback: (tab) => {
            if (!wedding) return;
            const urlInfo = generateURL(location.pathname, location.search);
            const queryParams = urlInfo.queryParams;

            if (tab !== WEDDING_SETTINGS_TABS.WEDDING) {
                Object.keys(queryParams).forEach((key) => {
                    if (key !== 'tab') {
                        delete queryParams[key];
                    }
                });
            }
            setCurrentPage(1);

            navigate(
                routes.weddingSettings({
                    ...queryParams,
                    tab: tab,
                })
            );
        },
    });

    return (
        <AppContentWrapper pt={0}>
            <Metadata
                title="Bruiloft instellingen"
                description="Bruiloft instellingen pagina"
            />
            <Hero
                url={wedding?.bannerImage?.asset.url}
                color="white"
                previewUrl={wedding?.bannerImage?.asset.previewUrl}
                fileType={wedding?.bannerImage?.asset.fileType || 'image'}
                imageProps={{
                    objectPosition: wedding?.bannerImage?.metadata
                        ? `${wedding?.bannerImage?.metadata?.focalPoint?.x}% ${wedding?.bannerImage?.metadata?.focalPoint?.y}%`
                        : 'center',
                }}
                subtitle={HERO_SUBTITLE_MAP[currentTab]}
                title={wedding?.name}
            />
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
                        <Tab>Bruiloft</Tab>
                        <Tab>Partners</Tab>
                        <Tab>Dagdelen</Tab>
                    </Container>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Container>
                            {wedding && <UpdateWeddingForm wedding={wedding} />}
                        </Container>
                    </TabPanel>
                    <TabPanel>
                        {wedding && (
                            <Container>
                                <UpdatePartnersForm
                                    partners={wedding?.partners || []}
                                />
                            </Container>
                        )}
                    </TabPanel>
                    <TabPanel>
                        {wedding && (
                            <Container>
                                <UpdateWeddingDayParts wedding={wedding} />
                            </Container>
                        )}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </AppContentWrapper>
    );
};

export default WeddingSettingsPage;
