-- AlterTable
ALTER TABLE "Asset" ADD COLUMN     "altText" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "mediaLibraryId" TEXT,
ADD COLUMN     "originalFilename" TEXT,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "galleryId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "MediaLibrary" (
    "id" TEXT NOT NULL,
    "gcloudStoragePath" TEXT NOT NULL,
    "weddingId" TEXT NOT NULL,
    "maxAllowedAssets" INTEGER NOT NULL DEFAULT 75,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MediaLibrary_weddingId_key" ON "MediaLibrary"("weddingId");

-- AddForeignKey
ALTER TABLE "MediaLibrary" ADD CONSTRAINT "MediaLibrary_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_mediaLibraryId_fkey" FOREIGN KEY ("mediaLibraryId") REFERENCES "MediaLibrary"("id") ON DELETE SET NULL ON UPDATE CASCADE;
