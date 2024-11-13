import React from 'react';

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    ButtonGroup,
    Icon,
    IconButton,
    Tooltip,
    useToast,
} from '@chakra-ui/react';
import { BiWorld } from 'react-icons/bi';
import { FaSave } from 'react-icons/fa';

import { routes, useBlocker, useParams } from '@redwoodjs/router';

import { useAuth } from 'src/auth';

import { PuckConfigComponentType } from '../../PuckStudio';
import { useGlobalPuckContext } from '../PuckPreviewWrapper';

type PuckHeaderProps = {
    isActive: boolean;
};

const PuckHeader = ({ isActive }: PuckHeaderProps) => {
    const { onPublish, isLoading, puck, dataUpdated } = useGlobalPuckContext();
    const { landingPageId } = useParams();
    const { currentUser } = useAuth();
    const weddingId = currentUser?.weddingId;
    const toast = useToast();

    const handleVisitLiveSite = () => {
        if (!weddingId || !landingPageId || !isActive) return;

        window.open(
            routes.weddingRsvpLandingPage({
                weddingId,
                landingPageId,
            }),
            '_blank'
        );
    };

    const handleSave = async () => {
        const hasRsvpFormPresent = !!puck.appState.data?.content?.find(
            (block) =>
                (block.type as keyof PuckConfigComponentType) === 'RsvpForm'
        );

        if (!hasRsvpFormPresent) {
            toast({
                title: 'Er is geen RSVP formulier aanwezig',
                description:
                    'Een landingspagina moet een RSVP formulier bevatten, zie de components in de sidebar en sleep het RSVP formulier naar de landingspagina',
                status: 'error',
            });
            return;
        }
        toast({
            title: 'Landing page is opgeslagen',
            description: 'De landingspagina is succesvol opgeslagen',
            status: 'success',
        });

        await onPublish?.(puck.appState.data);
    };

    const blocker = useBlocker({ when: dataUpdated });
    const cancelRef = React.useRef(null);

    return (
        <>
            <AlertDialog
                isOpen={blocker.state === 'BLOCKED'}
                leastDestructiveRef={cancelRef}
                onClose={blocker.abort}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Let op 🚨!
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Je hebt wijzigingen aangebracht die nog niet zijn
                            opgeslagen. Weet je zeker dat je de pagina wilt
                            verlaten?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={blocker.abort}>
                                Annuleren
                            </Button>
                            <Button
                                colorScheme="secondary"
                                onClick={blocker.confirm}
                                ml={3}
                                variant="ghost"
                            >
                                Verder
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <ButtonGroup>
                <Button
                    isLoading={isLoading}
                    colorScheme={dataUpdated ? 'orange' : 'secondary'}
                    onClick={handleSave}
                    type="button"
                >
                    Opslaan
                    {dataUpdated && <Icon ml={4} as={FaSave} />}
                </Button>
                {weddingId && landingPageId && (
                    <Tooltip
                        label={
                            isActive
                                ? 'Bekijk de live site'
                                : 'Deze landingspagina is niet actief ❌. Ga naar de settings om de landingspagina actief te maken'
                        }
                    >
                        <IconButton
                            isDisabled={!isActive}
                            variant="ghost"
                            fontSize="2xl"
                            icon={<BiWorld />}
                            aria-label="Live site"
                            title="Live site"
                            onClick={handleVisitLiveSite}
                        />
                    </Tooltip>
                )}
            </ButtonGroup>
        </>
    );
};

export default PuckHeader;
