import * as Sentry from '@sentry/node';

import { db as client } from 'src/lib/db';
console.log(
    'process.env.SENTRY_ENABLED',
    process.env.SENTRY_ENABLED
);
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

Sentry.init({
    enabled:
        process.env.SENTRY_ENABLED === 'true' &&
        process.env.NODE_ENV === 'production',
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    integrations: [
        new Sentry.Integrations.Prisma({ client }),
        new Sentry.Integrations.Http({ tracing: true }),
    ],
    tracesSampleRate: 1.0,
});

export default Sentry;
