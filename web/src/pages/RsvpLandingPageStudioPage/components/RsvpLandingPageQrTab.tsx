import React from 'react';

import { Container, TabPanel } from '@chakra-ui/react';
import { GetWeddingRsvpLandingPage } from 'types/graphql';

import RsvpQrCreateForm from './RsvpQrCreateForm';
import RsvpQrUpdateForm from './RsvpQrUpdateForm';

type RsvpLandingPageQrTab = {
    weddingRsvpLandingPage: GetWeddingRsvpLandingPage['weddingRsvpLandingPage'];
    loading: boolean;
};

const RsvpLandingPageQrTab = ({
    weddingRsvpLandingPage,
    loading,
}: RsvpLandingPageQrTab) => {
    const hasQrCode =
        weddingRsvpLandingPage?.qrCode && weddingRsvpLandingPage.qrCodeId;

    return (
        <TabPanel>
            <Container>
                {!hasQrCode && (
                    <RsvpQrCreateForm formType="create" loading={loading} />
                )}
                {hasQrCode && (
                    <RsvpQrUpdateForm
                        formType="update"
                        loading={loading}
                        name={weddingRsvpLandingPage.name}
                        qrCodeId={weddingRsvpLandingPage.qrCodeId}
                    />
                )}
            </Container>
        </TabPanel>
    );
};

export default RsvpLandingPageQrTab;
