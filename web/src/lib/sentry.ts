import * as Sentry from '@sentry/react';

Sentry.init({
    enabled:
        process.env.SENTRY_ENABLED === 'true' &&
        process.env.NODE_ENV === 'production' &&
        !!process.env.SENTRY_DSN,
    dsn: process.env.SENTRY_DSN,
    environment:
        process.env.NODE_ENV === 'production' ? 'production' : 'development',
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    tracesSampleRate: 1.0,
});

export default Sentry;
