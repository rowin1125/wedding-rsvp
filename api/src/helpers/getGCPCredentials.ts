import { Storage, StorageOptions } from '@google-cloud/storage';

export const getGCPCredentials = (): StorageOptions => {
    // for Vercel, use environment variables
    return process.env.REDWOOD_ENV_GOOGLE_PRIVATE_KEY
        ? {
              credentials: {
                  client_email:
                      process.env.REDWOOD_ENV_GCLOUD_SERVICE_ACCOUNT_EMAIL,
                  private_key: process.env.REDWOOD_ENV_GOOGLE_PRIVATE_KEY,
              },
              projectId: process.env.REDWOOD_ENV_GCP_PROJECT_ID,
          }
        : // for local development, use gcloud CLI
          {
              keyFilename: 'storage-key.json',
          };
};

export const getStorageClient = async (bucketName?: string) => {
    const storageClient = new Storage(getGCPCredentials());
    const finalBucketName =
        bucketName ??
        process.env.REDWOOD_ENV_GCLOUD_STORAGE_BUCKET ??
        'bruiloft_buddy_dev';

    const bucket = storageClient.bucket(finalBucketName);

    return bucket;
};
