import {
    Alert,
    AlertIcon,
    Box,
    Flex,
    Image,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { Data } from '@measured/puck';
import { InferType } from 'yup';

import { useParams } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import Loader from 'src/components/Loader';
import PuckStudio from 'src/components/PuckStudio/PuckStudio';
import { Salter } from 'src/helpers/Salter';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import useLocalStorage from 'src/hooks/useLocalStorage';

import { useGetWeddingRsvpLandingPage } from '../RsvpLandingsPage/hooks/useGetWeddingRsvpLandingPage';

import RsvpPasswordForm, {
    passwordValidationSchema,
} from './components/RsvpPasswordForm';
import WeddingNotFound from './components/WeddingNotFound';

const WeddingRsvpPage = () => {
    const { weddingId } = useParams();
    const toast = useToast();
    const { wedding, loading } = useGetWeddingById(weddingId);
    const { weddingRsvpLandingPage, loading: rsvpPageLoading } =
        useGetWeddingRsvpLandingPage();
    const passwordRequired = !!weddingRsvpLandingPage?.password;

    const [validPassword, toggleNav] = useLocalStorage(
        `${weddingId}-password`,
        false
    );

    const { isOpen, onClose } = useDisclosure({
        defaultIsOpen: !validPassword,
    });

    if (!loading && !wedding) {
        toast({
            title: 'Deze bruiloft bestaat niet',
            status: 'error',
        });

        return <WeddingNotFound />;
    }
    const handleOnClose = () => {
        if (!validPassword) return;

        onClose();
    };

    const handleSubmit = async (
        data: InferType<typeof passwordValidationSchema>
    ) => {
        if (!weddingRsvpLandingPage?.password) return;

        const desaltedPassword = await new Salter().parseString(
            weddingRsvpLandingPage.password
        );

        if (data.password === desaltedPassword) {
            toggleNav(true);
            onClose();
            toast({
                title: 'Wachtwoord is juist',
                status: 'success',
            });
        } else {
            toast({
                title: 'Wachtwoord is onjuist',
                status: 'error',
            });
        }
    };

    return (
        <>
            <Metadata title="Uitnodiging" description="WeddingRsvp page" />
            {(loading || rsvpPageLoading || !weddingRsvpLandingPage) && (
                <Loader />
            )}
            {!validPassword && passwordRequired && weddingRsvpLandingPage && (
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    pt={{ base: 32, lg: 40 }}
                    h="100svh"
                    w="100svw"
                >
                    <Image
                        src="https://derow-v1.cdn.prismic.io/derow-v1/ZvpG_rVsGrYSwHg6_Group.svg"
                        alt="Password protected"
                        w="50svw"
                        h="auto"
                    />
                    <Modal isOpen={isOpen} onClose={handleOnClose} size="lg">
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                {wedding?.name} - Uitnodiging
                            </ModalHeader>
                            <ModalBody>
                                <Alert status="info">
                                    <AlertIcon />
                                    Deze pagina is beveiligd met een wachtwoord.
                                    Vul het wachtwoord in dat je hebt ontvangen
                                    om verder te gaan.
                                </Alert>
                                <RsvpPasswordForm
                                    onSubmit={handleSubmit}
                                    loading={loading}
                                />
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Flex>
            )}
            {(validPassword || !passwordRequired) && weddingRsvpLandingPage && (
                <Box pt={{ base: 32, lg: 36 }}>
                    <PuckStudio
                        initialData={
                            weddingRsvpLandingPage.pageBuilderData as Partial<Data>
                        }
                        renderView
                        isLoading={loading || rsvpPageLoading}
                    />
                </Box>
            )}
        </>
    );
};

export default WeddingRsvpPage;
