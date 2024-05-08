import { useCallback, useMemo } from 'react';

import { EditIcon } from '@chakra-ui/icons';
import { Heading, Box, useDisclosure, Button, Icon } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { FaMagnifyingGlassPlus } from 'react-icons/fa6';

import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';

import GuestInvitationModal from 'src/components/GuestDataTable/components/GuestInvitationModal';
import { GuestDataTable } from 'src/components/GuestDataTable/GuestDataTable';
import Hero from 'src/components/Hero';
import Loader from 'src/components/Loader';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import { useGetWeddingInvitationsByWeddingId } from 'src/hooks/useGetWeddingInvitationsByWeddingId';
import AppContentWrapper from 'src/layouts/AppLayout/components/AppContentWrapper';

import { DayGuestType } from '../DayGuestsPage/DayGuestsPage';

const columnHelper = createColumnHelper<DayGuestType>();

const EveningGuestsPage = () => {
    const disclosure = useDisclosure();
    const { wedding } = useGetWeddingById();
    const { weddingInvitations, loading } =
        useGetWeddingInvitationsByWeddingId();
    const [invitationId, setInvitationId] = React.useState<string>();

    const eveningGuests = weddingInvitations?.filter(
        (weddingInvitation) => weddingInvitation.invitationType === 'EVENING'
    );

    const handleRowClick = useCallback(
        (invitationId: string) => {
            setInvitationId(invitationId);
            disclosure.onOpen();
        },
        [setInvitationId, disclosure]
    );

    const handleOnClose = () => {
        setInvitationId(undefined);
        disclosure.onClose();
    };

    const columns = useMemo(
        () => [
            columnHelper.accessor('Actions', {
                cell: (info) => {
                    if (info.row.depth !== 0) return null;

                    return (
                        <>
                            {wedding?.id && info.row.original.id && (
                                <Button
                                    as={Link}
                                    to={routes.updateWeddingInvitation({
                                        weddingId: wedding.id,
                                        weddingInvitationId:
                                            info.row.original.id,
                                    })}
                                    colorScheme="body"
                                    variant="outline"
                                    mr={2}
                                    size={{
                                        base: 'xs',
                                        lg: 'sm',
                                    }}
                                >
                                    <Icon as={EditIcon} />
                                </Button>
                            )}
                            <Button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRowClick(info.row.original.id);
                                }}
                                size={{
                                    base: 'xs',
                                    lg: 'sm',
                                }}
                                colorScheme="body"
                            >
                                <Icon as={FaMagnifyingGlassPlus} />
                            </Button>
                        </>
                    );
                },
                header: 'Actions',
            }),
            columnHelper.accessor('Genodigde', {
                cell: (info) => info.getValue(),
                header: 'Genodigde',
            }),
            columnHelper.accessor('Aantal', {
                cell: (info) => info.getValue(),
                header: 'Aantal',
            }),
            columnHelper.accessor('Aanwezig', {
                cell: (info) => {
                    if (info.row.depth > 0) return;

                    return info.getValue();
                },
                header: 'Aanwezig',
            }),
            columnHelper.accessor('Ingevuld op', {
                cell: (info) => (
                    <Box pl={info.row.depth * 2}>{info.getValue()}</Box>
                ),
                header: 'Ingevuld op',
            }),
            columnHelper.accessor('Dieet wensen', {
                cell: (info) => {
                    if (info.row.depth > 0) return;

                    return info.getValue() || 'Geen';
                },
            }),
        ],
        [handleRowClick, wedding?.id]
    );

    const data = eveningGuests?.map((weddingInvitation) => ({
        'Ingevuld op': weddingInvitation.createdAt
            ? new Date(weddingInvitation.createdAt).toLocaleDateString('nl-NL')
            : 'Unknown',
        Genodigde:
            weddingInvitation.weddingGuests[0]?.name ||
            `${weddingInvitation.weddingGuests[0]?.firstName} ${weddingInvitation.weddingGuests[0]?.lastName}` ||
            'Unknown',
        Aantal: weddingInvitation.weddingGuests.length,
        Aanwezig: weddingInvitation.presence ? 'Ja' : 'Nee',
        id: weddingInvitation.id,
        subRows: weddingInvitation.weddingGuests.map((weddingGuest) => ({
            Genodigde:
                weddingGuest?.name ||
                `${weddingGuest?.firstName} ${weddingGuest?.lastName}`,
            Aanwezig: weddingInvitation?.presence ? 'Ja' : 'Nee',
        })),
        'Dieet wensen': weddingInvitation.dietaryWishes || 'Geen',
    }));

    const presentGuests = data?.reduce((acc, curr) => {
        if (curr.Aanwezig === 'Nee') return acc;

        return acc + curr.Aantal;
    }, 0);

    return (
        <>
            <Metadata title="EveningGuests" description="EveningGuests page" />
            <Hero />

            <AppContentWrapper>
                <Heading mb={8}>
                    Avondgasten{' '}
                    <Box as="span" fontWeight="black">
                        {presentGuests}
                    </Box>{' '}
                    aanwezig van de geschatte{' '}
                    <Box as="span" fontWeight="black">
                        {wedding?.eveningInvitationAmount}
                    </Box>{' '}
                    genodigden
                </Heading>
                <GuestInvitationModal
                    isOpen={disclosure.isOpen}
                    onClose={handleOnClose}
                    invitationId={invitationId}
                />
                {!data && loading && <Loader />}
                {data && <GuestDataTable columns={columns} data={data} />}
            </AppContentWrapper>
        </>
    );
};

export default EveningGuestsPage;
