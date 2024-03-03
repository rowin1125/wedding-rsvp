import { useCallback, useMemo } from 'react';

import { Heading, Box, useDisclosure, Button } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';

import { MetaTags } from '@redwoodjs/web';

import GuestInvitationModal from 'src/components/GuestDataTable/components/GuestInvitationModal';
import { GuestDataTable } from 'src/components/GuestDataTable/GuestDataTable';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import { useGetWeddingInvitationsByWeddingId } from 'src/hooks/useGetWeddingInvitationsByWeddingId';

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
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRowClick(info.row.original.id);
                            }}
                            colorScheme="body"
                        >
                            Details
                        </Button>
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
        ],
        [handleRowClick]
    );

    const data = eveningGuests?.map((weddingInvitation) => ({
        'Ingevuld op': weddingInvitation.createdAt
            ? new Date(weddingInvitation.createdAt).toLocaleDateString('nl-NL')
            : 'Unknown',
        Genodigde:
            `${weddingInvitation.weddingGuests[0]?.firstName} ${weddingInvitation.weddingGuests[0]?.lastName}` ||
            weddingInvitation.weddingGuests[0]?.name ||
            'Unknown',
        Aantal: weddingInvitation.weddingGuests.length,
        Aanwezig: weddingInvitation.presence ? 'Ja' : 'Nee',
        id: weddingInvitation.id,
        subRows: weddingInvitation.weddingGuests.map((weddingGuest) => ({
            Genodigde:
                `${weddingGuest?.firstName} ${weddingGuest?.lastName}` ||
                weddingGuest?.name,
            Aanwezig: weddingInvitation?.presence ? 'Ja' : 'Nee',
        })),
    }));

    if (!data || loading) return null;

    const presentGuests = data.reduce((acc, curr) => {
        if (curr.Aanwezig === 'Nee') return acc;

        return acc + curr.Aantal;
    }, 0);

    return (
        <>
            <MetaTags title="EveningGuests" description="EveningGuests page" />

            <Box>
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
                <GuestDataTable columns={columns} data={data} />
            </Box>
        </>
    );
};

export default EveningGuestsPage;
