import { useParams } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';

import { useGetGuestInvitationById } from 'src/components/GuestDataTable/hooks/useGetGuestInvitationById';

import UpdateRsvp from './components/UpdateRsvp';

const UpdateWeddingInvitationPage = () => {
    const { weddingInvitationId } = useParams();
    const { weddingInvitation } =
        useGetGuestInvitationById(weddingInvitationId);

    return (
        <>
            <MetaTags
                title="UpdateWeddingInvitation"
                description="UpdateWeddingInvitation page"
            />

            <UpdateRsvp
                invitationType={weddingInvitation?.invitationType || 'DAY'}
            />
        </>
    );
};

export default UpdateWeddingInvitationPage;
