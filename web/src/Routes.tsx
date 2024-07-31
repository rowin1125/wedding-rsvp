import { Router, Route, Set, PrivateSet } from '@redwoodjs/router';

import { useAuth } from './auth';
import AppLayout from './layouts/AppLayout/AppLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import GeneralLayout from './layouts/GeneralLayout/GeneralLayout';
import { ROLE_ENUMS } from './lib/api/constants';

const Routes = () => {
    return (
        <Router useAuth={useAuth}>
            <PrivateSet wrap={AppLayout} unauthenticated="login">
                <Route path="/app/wedding-instellingen" page={WeddingSettingsPage} name="weddingSettings" />
            </PrivateSet>
            <Set wrap={AppLayout}>
                <PrivateSet unauthenticated="dashboard" roles={[ROLE_ENUMS.USER, ROLE_ENUMS.ADMIN]}>
                    <Route path="/app/onboarding" page={OnboardingPage} name="onboarding" />
                </PrivateSet>
                <PrivateSet unauthenticated="home" roles={[ROLE_ENUMS.ADMIN, ROLE_ENUMS.MASTER_OF_CEREMONIES, ROLE_ENUMS.WEDDING_OWNER]}>
                    <Route path="/app/dashboard" page={DashboardPage} name="dashboard" />
                    <Route path="/app/media" page={MediaPage} name="media" />
                    <Route path="/app/dagdelen/dag-gasten" page={DayGuestsPage} name="dayGuests" />
                    <Route path="/app/dagdelen/avond-gasten" page={EveningGuestsPage} name="eveningGuests" />
                    <Route path="/app/galerij/{galleryId}" page={GalleryPage} name="gallery" />
                    <Route path="/app/galerijen" page={GalleriesPage} name="galleries" />
                </PrivateSet>
            </Set>
            <Set wrap={GeneralLayout}>
                <Route path="/api/qr/{qrId}" page={QrCodePage} name="qrCode" />
                <Route path="/{weddingId}/galerij/{galleryId}" page={PublicGalleryPage} name="publicGallery" />
                <Route prerender path="/" page={HomePage} name="home" />
                <Route prerender notfound page={NotFoundPage} />

                <Route path="/bruiloft/{weddingId}/rsvp/{invitationType}" page={WeddingRsvpPage} name="weddingRsvp" />
                {/* Old route, can be removed after 01-06-2024 */}
                <Route redirect="/bruiloft/{weddingId}/rsvp/{invitationType}" path="/bruiloft/{weddingId}/{invitationType}" />

                <Route path="/bruiloft/{weddingId}/uitnodiging/{weddingInvitationId}" page={UpdateWeddingInvitationPage} name="updateWeddingInvitation" />
                {/* Old route, can be removed after 01-06-2024 */}
                <Route redirect="/bruiloft/{weddingId}/uitnodiging/{weddingInvitationId}" path="/{weddingId}/uitnodiging/{weddingInvitationId}" />
            </Set>
            <Set wrap={AuthLayout}>
                <Route prerender path="/inloggen" page={LoginPage} name="login" />
                <Route prerender path="/aanmelden" page={SignupPage} name="signup" />
                <Route prerender path="/wachtwoord-vergeten" page={ForgotPasswordPage} name="forgotPassword" />
                <Route prerender path="/wachtwoord-herstellen" page={ResetPasswordPage} name="resetPassword" />
                <Route prerender path="/activeren" page={ActivatePage} name="activate" />
            </Set>
        </Router>
    );
};

export default Routes;
