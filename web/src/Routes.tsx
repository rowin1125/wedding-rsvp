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
                    <Route path="/admin/dag-gasten" page={DayGuestsPage} name="dayGuests" />
                    <Route path="/admin/avond-gasten" page={EveningGuestsPage} name="eveningGuests" />
                </PrivateSet>
            </Set>
            <Set wrap={GeneralLayout}>
                <Route path="/{weddingId}/uitnodiging/{weddingInvitationId}" page={UpdateWeddingInvitationPage} name="updateWeddingInvitation" />
                <Route path="/bruiloft/{weddingId}/{invitationType}" page={WeddingRsvpPage} name="weddingRsvp" />
                <Route path="/" page={HomePage} name="home" />
                <Route notfound page={NotFoundPage} />
            </Set>
            <Set wrap={AuthLayout}>
                <Route path="/login" page={LoginPage} name="login" />
                <Route path="/signup" page={SignupPage} name="signup" />
                <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
                <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
            </Set>
        </Router>
    );
};

export default Routes;
