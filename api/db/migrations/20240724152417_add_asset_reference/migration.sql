/*
  Warnings:

  - A unique constraint covering the columns `[bannerImageId]` on the table `Gallery` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bannerImageId]` on the table `Wedding` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "bannerImageId" TEXT;

-- AlterTable
ALTER TABLE "Wedding" ADD COLUMN     "bannerImageId" TEXT;

-- CreateTable
CREATE TABLE "AssetReference" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL,

    CONSTRAINT "AssetReference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_bannerImageId_key" ON "Gallery"("bannerImageId");

-- CreateIndex
CREATE UNIQUE INDEX "Wedding_bannerImageId_key" ON "Wedding"("bannerImageId");

-- AddForeignKey
ALTER TABLE "Wedding" ADD CONSTRAINT "Wedding_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "AssetReference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_bannerImageId_fkey" FOREIGN KEY ("bannerImageId") REFERENCES "AssetReference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetReference" ADD CONSTRAINT "AssetReference_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
