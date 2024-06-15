import { deleteOldArchives } from 'api/src/lib/gcloudBackgroundDownloader';
import { logger } from 'api/src/lib/logger';

export default async () => {
    logger.info('Running deleteOldGcloudZips script');
    await deleteOldArchives();
    logger.info('Finished deleteOldGcloudZips script');
};
