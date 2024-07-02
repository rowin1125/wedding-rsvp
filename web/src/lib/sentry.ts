import * as Sentry from '@sentry/react';

Sentry.init({
    enabled:
        process.env.SENTRY_ENABLED === 'true' &&
        process.env.NODE_ENV === 'production' &&
        !!process.env.SENTRY_DSN,
    dsn: process.env.SENTRY_DSN,
    environment:
        process.env.NODE_ENV === 'production' ? 'production' : 'development',
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
});

export default Sentry;
