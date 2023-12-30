import * as nodemailer from 'nodemailer';
import * as Sib from 'sib-api-v3-sdk';

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

export async function mailUser(options: MailUserOptions) {
    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY?.toString();

    const transEmailApi = new Sib.TransactionalEmailsApi();

    const emailOptions = {
        ...options,
        sender: options.sender ?? {
            name: 'Demi & Rowin',
            email: 'demi.rowin@gmail.com',
        },
        bcc: [
            {
                name: 'Demi & Rowin',
                email: 'demi.rowin@gmail.com',
            },
        ],
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
                console.error('err', err);
            })
    );
}

interface Options {
    to: string | string[];
    subject: string;
    text?: string;
    html: string;
}

// create reusable transporter object using SendInBlue for SMTP
export const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'demi.rowin@gmail.com',
        pass: process.env.SENDINBLUE_SMTP_KEYS,
    },
});

export async function sendEmail({ to, subject, text, html }: Options) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'Demi & Rowin | Bruiloft',
        to: Array.isArray(to) ? to : [to], // list of receivers
        subject, // Subject line
        text, // plain text body
        html, // html body
    });

    return info;
}
