import { downloadInBackground } from 'api/src/lib/gcloudBackgroundDownloader';
import { logger } from 'api/src/lib/logger';
import Sentry from 'api/src/lib/sentry';
import faktory from 'faktory-worker';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
faktory.register('downloadAllFiles', async (taskArgs: any) => {
    logger.info('running downloadAllFiles in background worker');

    await downloadInBackground(taskArgs);
});

export default async () => {
    const worker = await faktory
        .work({
            url: process.env.FAKTORY_URL,
            password: process.env.FAKTORY_PASSWORD,
        })
        .catch((error) => {
            Sentry.captureException(error);
            logger.error(`worker failed to start: ${error}`);
            process.exit(1);
        });

    worker.on('fail', ({ _job, error }) => {
        logger.error(`worker failed to start: ${error}`);
    });
};
