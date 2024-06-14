# all-images-resize-function
This function resizes all images in a given Google Cloud Storage bucket.

This can be used in 2 ways:
- Locally
- In Google Cloud

Be aware that the function will resize all images in the bucket specified in the `GCLOUD_STORAGE_BUCKET` environment variable. This can be a large number of images, so be careful when running this function. Also be aware of the costs associated with running this function in Google Cloud. If you're not using the function, it's best to delete it and use the local setup.

## Local setup
1. Install the dependencies:
```bash
yarn workspace all-images-resize-function install
```
2. Set the environment variables:
3. Run the function:
```bash
yarn workspace all-images-resize-function gcp-build && yarn workspace all-images-resize-function start
```
4. Visit `http://localhost:8081` to run the function.

## Google Cloud setup
1. Deploy the function:
```bash
make do-deploy-resize-all-function
```
This will deploy the function and create an HTTP trigger. This can be accessed by the URL provided in the output or in the Google Cloud Console.

2. Run the function:
This function is triggered by an HTTP request. To run the function, visit the URL provided in the output or in the Google Cloud Console. The function will resize all images in the bucket specified in the `GCLOUD_STORAGE_BUCKET` environment variable.

## Environment variables (for the values, see Google console)
- `GCLOUD_STORAGE_BUCKET`: The Google Cloud Storage bucket where the images are stored.
- `GCP_PROJECT_ID`: The Google Cloud Project ID.
- `GCLOUD_SERVICE_ACCOUNT_EMAIL`: The Google Cloud Service Account email.
- `GOOGLE_PRIVATE_KEY`: The Google Cloud Service Account private key.

## Function logic
1. The function is triggered by an HTTP request.
2. The function gets the list of all images in the Google Cloud Storage bucket specified in the `GCLOUD_STORAGE_BUCKET` environment variable.
3. The function resizes each image to thumbnail size and preview size.
4. The function uploads the resized images back to the Google Cloud Storage bucket.

## Function dependencies
- `google-cloud-storage`: To interact with Google Cloud Storage.
- `sharp`: To resize images.
