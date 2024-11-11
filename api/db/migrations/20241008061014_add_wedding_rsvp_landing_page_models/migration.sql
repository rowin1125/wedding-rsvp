/*
  Warnings:

  - Added the required column `weddingId` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "GuestWeddingResponseStatus" ADD VALUE 'UNINVITED';

-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_guestGroupId_fkey";

-- DropForeignKey
ALTER TABLE "GuestWeddingResponse" DROP CONSTRAINT "GuestWeddingResponse_guestId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "weddingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AssetReference" ADD COLUMN     "objectReference" TEXT,
ADD COLUMN     "weddingRsvpLandingPageId" TEXT;

-- AlterTable
ALTER TABLE "GuestDayPartPresent" ADD COLUMN     "weddingRsvpLandingPageId" TEXT;

-- AlterTable
ALTER TABLE "GuestWeddingResponse" ADD COLUMN     "weddingRsvpLandingPageId" TEXT;

-- AlterTable
ALTER TABLE "QrCode" ADD COLUMN     "weddingId" TEXT;

-- AlterTable
ALTER TABLE "WeddingInvitationResponse" ADD COLUMN     "weddingRsvpLandingPageId" TEXT;

-- CreateTable
CREATE TABLE "WeddingRsvpLandingPage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "pageBuilderData" JSONB NOT NULL DEFAULT '{}',
    "sidebarData" JSONB NOT NULL DEFAULT '{}',
    "weddingId" TEXT NOT NULL,
    "qrCode" TEXT,
    "qrCodeId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeddingRsvpLandingPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_WeddingDayPartToWeddingRsvpLandingPage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WeddingRsvpLandingPage_qrCode_key" ON "WeddingRsvpLandingPage"("qrCode");

-- CreateIndex
CREATE UNIQUE INDEX "_WeddingDayPartToWeddingRsvpLandingPage_AB_unique" ON "_WeddingDayPartToWeddingRsvpLandingPage"("A", "B");

-- CreateIndex
CREATE INDEX "_WeddingDayPartToWeddingRsvpLandingPage_B_index" ON "_WeddingDayPartToWeddingRsvpLandingPage"("B");

-- AddForeignKey
ALTER TABLE "WeddingRsvpLandingPage" ADD CONSTRAINT "WeddingRsvpLandingPage_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_guestGroupId_fkey" FOREIGN KEY ("guestGroupId") REFERENCES "GuestGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeddingInvitationResponse" ADD CONSTRAINT "WeddingInvitationResponse_weddingRsvpLandingPageId_fkey" FOREIGN KEY ("weddingRsvpLandingPageId") REFERENCES "WeddingRsvpLandingPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestWeddingResponse" ADD CONSTRAINT "GuestWeddingResponse_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestWeddingResponse" ADD CONSTRAINT "GuestWeddingResponse_weddingRsvpLandingPageId_fkey" FOREIGN KEY ("weddingRsvpLandingPageId") REFERENCES "WeddingRsvpLandingPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestDayPartPresent" ADD CONSTRAINT "GuestDayPartPresent_weddingRsvpLandingPageId_fkey" FOREIGN KEY ("weddingRsvpLandingPageId") REFERENCES "WeddingRsvpLandingPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetReference" ADD CONSTRAINT "AssetReference_weddingRsvpLandingPageId_fkey" FOREIGN KEY ("weddingRsvpLandingPageId") REFERENCES "WeddingRsvpLandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QrCode" ADD CONSTRAINT "QrCode_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WeddingDayPartToWeddingRsvpLandingPage" ADD CONSTRAINT "_WeddingDayPartToWeddingRsvpLandingPage_A_fkey" FOREIGN KEY ("A") REFERENCES "WeddingDayPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WeddingDayPartToWeddingRsvpLandingPage" ADD CONSTRAINT "_WeddingDayPartToWeddingRsvpLandingPage_B_fkey" FOREIGN KEY ("B") REFERENCES "WeddingRsvpLandingPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
