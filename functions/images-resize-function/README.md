# images-resize-function
This function will resize an image to thumbnail size and preview size when an image is uploaded to a Google Cloud Storage bucket.

## Deploy and run the function
1. Deploy the function:
```bash
make do-deploy-resize-function
```

This will deploy the function and create a Google Cloud Storage trigger for when an image is uploaded to the bucket specified in the `GCLOUD_STORAGE_BUCKET` environment variable.

2. Run the function:
Upload an image to the Google Cloud Storage bucket specified in the `GCLOUD_STORAGE_BUCKET` environment variable. The function will resize the image to thumbnail size and preview size.

## Environment variables (for the values, see Google console)
- `GCLOUD_STORAGE_BUCKET`: The Google Cloud Storage bucket where the images are stored.
- `GCP_PROJECT_ID`: The Google Cloud Project ID.
- `GCLOUD_SERVICE_ACCOUNT_EMAIL`: The Google Cloud Service Account email.
- `GOOGLE_PRIVATE_KEY`: The Google Cloud Service Account private key.

## Function logic
1. The function is triggered by an image upload to the Google Cloud Storage bucket specified in the `GCLOUD_STORAGE_BUCKET` environment variable.
2. The function resizes the image to thumbnail size and preview size.
3. The function uploads the resized images back to the Google Cloud Storage bucket.

## Function dependencies
- `google-cloud-storage`: To interact with Google Cloud Storage.
- `sharp`: To resize images.
