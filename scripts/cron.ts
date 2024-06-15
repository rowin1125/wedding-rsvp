import { exec } from 'child_process';

import { logger } from 'api/src/lib/logger';
import { CronJob } from 'cron';

export default async () => {
    // Schedule a RedwoodJS script to run every day at midnight
    const job = new CronJob('0 */4 * * *', function () {
        logger.info('Running cron job');

        exec('yarn rw exec deleteOldGcloudZips', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                logger.error(`Error executing command: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`Error output: ${stderr}`);
                logger.error(`Error output: ${stderr}`);
                return;
            }
            logger.info(`Command output: ${stdout}`);
            console.log(`Command output: ${stdout}`);
        });
    });

    job.start();
    logger.info('Cron job started');
};
