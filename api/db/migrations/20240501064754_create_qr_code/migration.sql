/*
  Warnings:

  - A unique constraint covering the columns `[qrCode]` on the table `Gallery` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Gallery" ADD COLUMN     "qrCode" TEXT,
ADD COLUMN     "qrCodeId" TEXT;

-- CreateTable
CREATE TABLE "QrCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "redirectUrl" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QrCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_qrCode_key" ON "Gallery"("qrCode");
