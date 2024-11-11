import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    Icon,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure,
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';

import { navigate, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import { useControlledTabs } from 'src/components/Gallery/hooks/useControlledTabs';
import Hero from 'src/components/Hero';
import Loader from 'src/components/Loader';
import { generateURL } from 'src/helpers/generateURL/generateURL';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import { useIsDevice } from 'src/hooks/useIsDevice';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import GuestGroupTable from './components/GuestGroupTable/GuestGroupTable';
import GuestListIntro from './components/GuestListIntro/GuestListIntro';
import GuestListStats from './components/GuestListStats/GuestListStats';
import { useGetWeddingInvitationResponses } from './components/WeddingInvitationResponses/hooks/useGetWeddingInvitationResponses';
import WeddingInvitationResponses from './components/WeddingInvitationResponses/WeddingInvitationResponses';
import { useGetGuestGroups } from './hooks/useGetGuestGroups';

export const GUESTS_LIST_TABS = {
    MAIN: 'main',
    RSVP: 'rsvp',
};

const GuestsListPage = () => {
    const { wedding } = useGetWeddingById();
    const { isDesktop } = useIsDevice();
    const { guestGroups, loading } = useGetGuestGroups();
    const disclosure = useDisclosure();
    const { weddingInvitationResponses } = useGetWeddingInvitationResponses();

    const { tabIndex, handleTabChange } = useControlledTabs({
        tabs: Object.values(GUESTS_LIST_TABS),
        navigationCallback: (tab) => {
            const urlInfo = generateURL(location.pathname, location.search);
            const queryParams = urlInfo.queryParams;

            if (tab !== GUESTS_LIST_TABS.MAIN) {
                Object.keys(queryParams).forEach((key) => {
                    if (key !== 'tab') {
                        delete queryParams[key];
                    }
                });
            }

            navigate(
                routes.guestsList({
                    ...queryParams,
                    tab: tab,
                })
            );
        },
    });

    return (
        <>
            <Metadata title="Dashboard" description="Dashboard page" />
            <Hero
                url={wedding?.bannerImage?.asset.url}
                previewUrl={wedding?.bannerImage?.asset.previewUrl}
                imageProps={{
                    objectPosition: wedding?.bannerImage?.metadata
                        ? `${wedding?.bannerImage?.metadata?.focalPoint?.x}% ${wedding?.bannerImage?.metadata?.focalPoint?.y}%`
                        : 'center',
                }}
                fileType={wedding?.bannerImage?.asset.fileType || 'image'}
                color="white"
                title="Gastenlijst"
            />
            <AppContentWrapper p={0}>
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
                            <Tab>Gastenlijst</Tab>
                            <Tab>
                                RSVP aanmeldingen{' '}
                                <Box ml={4}>
                                    <Flex
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        p={{
                                            base: 3,
                                            lg: 4,
                                        }}
                                        height={{
                                            base: '20px',
                                            lg: '20px',
                                        }}
                                        width={{
                                            base: '20px',
                                            lg: '20px',
                                        }}
                                        rounded="full"
                                        color="white"
                                        background={
                                            weddingInvitationResponses &&
                                            weddingInvitationResponses?.length >
                                                0
                                                ? 'orange.500'
                                                : 'green.500'
                                        }
                                        fontSize={{
                                            base: 'xx-small',
                                            lg: 'xs',
                                        }}
                                    >
                                        {weddingInvitationResponses?.length ? (
                                            weddingInvitationResponses?.length
                                        ) : (
                                            <Icon as={FaCheck} />
                                        )}
                                    </Flex>
                                </Box>
                            </Tab>
                        </Container>
                    </TabList>

                    <TabPanels>
                        <TabPanel px={{ base: 0 }}>
                            <Container>
                                <Grid
                                    templateColumns="repeat(12, 1fr)"
                                    rowGap={6}
                                    columnGap={{ lg: 6 }}
                                >
                                    <GuestListIntro
                                        wedding={wedding}
                                        disclosure={disclosure}
                                    />
                                    <GuestListStats guestGroups={guestGroups} />

                                    <GridItem colSpan={12}>
                                        {loading && !guestGroups && <Loader />}
                                        {guestGroups && (
                                            <GuestGroupTable
                                                guestGroups={guestGroups}
                                            />
                                        )}
                                        {!guestGroups?.length && !loading && (
                                            <Container my={10}>
                                                <Box>
                                                    <Heading>
                                                        Er zijn nog geen gasten
                                                        toegevoegd! 🔍️
                                                    </Heading>
                                                    <Button
                                                        mt={4}
                                                        onClick={
                                                            disclosure.onOpen
                                                        }
                                                    >
                                                        Voeg je eerste gasten
                                                        toe
                                                    </Button>
                                                </Box>
                                            </Container>
                                        )}
                                    </GridItem>
                                </Grid>
                            </Container>
                        </TabPanel>
                        <TabPanel>
                            <Container>
                                <Grid
                                    templateColumns="repeat(12, 1fr)"
                                    rowGap={6}
                                    columnGap={{ lg: 6 }}
                                >
                                    <WeddingInvitationResponses
                                        handleTabChange={handleTabChange}
                                        wedding={wedding}
                                        weddingInvitationResponses={
                                            weddingInvitationResponses
                                        }
                                    />
                                </Grid>
                            </Container>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </AppContentWrapper>
        </>
    );
};

export default GuestsListPage;
