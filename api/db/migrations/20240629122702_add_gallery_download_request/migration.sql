/*
  Warnings:

  - You are about to drop the column `downloadPending` on the `Gallery` table. All the data in the column will be lost.
  - You are about to drop the column `downloadRequestAt` on the `Gallery` table. All the data in the column will be lost.
  - You are about to drop the column `downloadUrl` on the `Gallery` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GalleryDownloadRequestStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "downloadPending",
DROP COLUMN "downloadRequestAt",
DROP COLUMN "downloadUrl",
ADD COLUMN     "maxAllowedDownloads" INTEGER NOT NULL DEFAULT 5;

-- CreateTable
CREATE TABLE "GalleryDownloadRequest" (
    "id" TEXT NOT NULL,
    "galleryId" TEXT NOT NULL,
    "status" "GalleryDownloadRequestStatus" NOT NULL,
    "validUntil" TIMESTAMP(3),
    "downloadUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryDownloadRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GalleryDownloadRequest" ADD CONSTRAINT "GalleryDownloadRequest_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
