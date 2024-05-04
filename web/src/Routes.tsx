import { Router, Route, Set, PrivateSet } from '@redwoodjs/router';

import { useAuth } from './auth';
import AdminLayout from './layouts/AdminLayout/AdminLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import GeneralLayout from './layouts/GeneralLayout/GeneralLayout';
import { ROLE_ENUMS } from './lib/api/constants';

const Routes = () => {
    return (
        <Router useAuth={useAuth}>
            <PrivateSet wrap={AdminLayout} unauthenticated="login">
                <Route path="/admin/wedding-instellingen" page={WeddingSettingsPage} name="weddingSettings" />
            </PrivateSet>
            <Set wrap={AdminLayout}>
                <PrivateSet unauthenticated="home" roles={[ROLE_ENUMS.ADMIN, ROLE_ENUMS.MASTER_OF_CEREMONIES, ROLE_ENUMS.WEDDING_OWNER]}>
                    <Route path="/admin/dashboard" page={DashboardPage} name="dashboard" />
                    <Route path="/admin/dagdelen/dag-gasten" page={DayGuestsPage} name="dayGuests" />
                    <Route path="/admin/dagdelen/avond-gasten" page={EveningGuestsPage} name="eveningGuests" />
                    <Route path="/admin/galerij/{galleryId}" page={GalleryPage} name="gallery" />
                    <Route path="/admin/galerijen" page={GalleriesPage} name="galleries" />
                </PrivateSet>
            </Set>
            <Set wrap={GeneralLayout}>
                <Route path="/api/qr/{id}" page={QrCodePage} name="qrCode" />
                <Route path="/{weddingId}/galerij/{galleryId}" page={PublicGalleryPage} name="publicGallery" />
                <Route path="/{weddingId}/uitnodiging/{weddingInvitationId}" page={UpdateWeddingInvitationPage} name="updateWeddingInvitation" />
                <Route path="/bruiloft/{weddingId}/{invitationType}" page={WeddingRsvpPage} name="weddingRsvp" />
                <Route prerender path="/" page={HomePage} name="home" />
                <Route prerender notfound page={NotFoundPage} />
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
