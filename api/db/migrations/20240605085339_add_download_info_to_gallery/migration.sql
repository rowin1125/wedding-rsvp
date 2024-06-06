-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "downloadPending" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "downloadRequestAt" TIMESTAMP(3),
ADD COLUMN     "downloadUrl" TEXT;
