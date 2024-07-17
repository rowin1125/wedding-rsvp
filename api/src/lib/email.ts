import * as Sib from 'sib-api-v3-sdk';

import Sentry from './sentry';

type MailToType = {
    name: string;
    email: string;
};
type MailSenderType = {
    name: string;
    email: string;
};
type MailUserOptions = {
    sender?: MailSenderType;
    to: MailToType[];
    templateId?: number;
    params?: Record<string, string>;
};

export const EMAIL_TEMPLATES_MAP = {
    RSVP_CONFIRMATION: 1,
    PASSWORD_RESET: 8,
    SIGNUP: 3,
    DOWNLOAD_GALLERY: 6,
    GENERAL_ERROR: 7,
};

export async function mailUser(options: MailUserOptions) {
    if (process.env.DISABLE_SENDINBLUE === 'true') return;

    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY?.toString();

    const transEmailApi = new Sib.TransactionalEmailsApi();

    const emailOptions = {
        ...options,
        sender: options.sender ?? {
            name: 'Bruiloft Buddy',
            email: 'demi.rowin@gmail.com',
        },
    };

    return (
        transEmailApi
            .sendTransacEmail(emailOptions)
            .then(() => {
                emailOptions.to.forEach((mailTo) =>
                    console.log(`Email sent to ${mailTo.email}`)
                );
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch((err: any) => {
                Sentry.captureException(err);

                console.error('err', err);
            })
    );
}
