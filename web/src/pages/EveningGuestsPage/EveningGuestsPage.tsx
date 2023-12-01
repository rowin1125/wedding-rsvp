import { Heading, Box } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';

import { MetaTags } from '@redwoodjs/web';

import { GuestDataTable } from 'src/components/GuestDataTable/GuestDataTable';
import { useGetWeddingById } from 'src/hooks/useGetWeddingById';
import { useGetWeddingInvitationsByWeddingId } from 'src/hooks/useGetWeddingInvitationsByWeddingId';

type UnitConversion = {
    'Ingevuld op': string;
    Genodigde: string;
    Aantal: number;
    Aanwezig: string;
    Opmerking?: string | null;
};

const columnHelper = createColumnHelper<UnitConversion>();

const columns = [
    columnHelper.accessor('Ingevuld op', {
        cell: (info) => info.getValue(),
        header: 'Ingevuld op',
    }),
    columnHelper.accessor('Aanwezig', {
        cell: (info) => info.getValue(),
        header: 'Aanwezig',
    }),
    columnHelper.accessor('Genodigde', {
        cell: (info) => info.getValue(),
        header: 'Genodigde',
    }),
    columnHelper.accessor('Aantal', {
        cell: (info) => info.getValue(),
        header: 'Aantal',
    }),
    columnHelper.accessor('Opmerking', {
        cell: (info) => info.getValue(),
        header: 'Opmerking',
    }),
];

const EveningGuestsPage = () => {
    const { wedding } = useGetWeddingById();
    const { weddingInvitations, loading } =
        useGetWeddingInvitationsByWeddingId();

    const eveningGuests = weddingInvitations?.filter(
        (weddingInvitation) => weddingInvitation.invitationType === 'EVENING'
    );

    const data = eveningGuests?.map((weddingInvitation) => ({
        'Ingevuld op': weddingInvitation.createdAt
            ? new Date(weddingInvitation.createdAt).toLocaleDateString('nl-NL')
            : 'Unknown',
        Genodigde: weddingInvitation.weddingGuests[0]?.name || 'Unknown',
        Aantal: weddingInvitation.weddingGuests.length,
        Aanwezig: weddingInvitation.presence ? 'Ja' : 'Nee',
        Opmerking: weddingInvitation.remarks,
        id: weddingInvitation.id,
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
                <GuestDataTable columns={columns} data={data} />
            </Box>
        </>
    );
};

export default EveningGuestsPage;
