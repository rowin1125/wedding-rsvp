/*
  Warnings:

  - You are about to drop the column `dayInvitationAmount` on the `Wedding` table. All the data in the column will be lost.
  - You are about to drop the column `eveningInvitationAmount` on the `Wedding` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GuestGroupType" AS ENUM ('FAMILY', 'PARTNERS', 'INDIVIDUAL');

-- CreateEnum
CREATE TYPE "GuestOrigin" AS ENUM ('GUEST_LIST', 'RSVP');

-- CreateEnum
CREATE TYPE "GuestWeddingResponseStatus" AS ENUM ('UNKNOWN', 'ACCEPTED', 'DECLINED');

-- DropForeignKey
ALTER TABLE "Asset" DROP CONSTRAINT "Asset_weddingId_fkey";

-- AlterTable
ALTER TABLE "Wedding" DROP COLUMN "dayInvitationAmount",
DROP COLUMN "eveningInvitationAmount";

-- DropEnum
DROP TYPE "InvitationType";

-- CreateTable
CREATE TABLE "GuestGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "guestGroupType" "GuestGroupType" NOT NULL,
    "guestGroupRelationType" TEXT NOT NULL,
    "addressId" TEXT,
    "weddingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "street" TEXT,
    "houseNumber" TEXT,
    "zipCode" TEXT,
    "city" TEXT,
    "country" TEXT,
    "livesAbroad" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "guestGroupId" TEXT,
    "weddingInvitationResponseId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "isChild" BOOLEAN NOT NULL DEFAULT false,
    "phoneNumber" TEXT,
    "email" TEXT,
    "dietary" TEXT[],
    "notes" TEXT,
    "connectedViaRsvp" BOOLEAN NOT NULL DEFAULT false,
    "guestOrigin" "GuestOrigin" NOT NULL DEFAULT 'GUEST_LIST',
    "guestGroupId" TEXT,
    "weddingId" TEXT NOT NULL,
    "addressId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeddingInvitationResponse" (
    "id" TEXT NOT NULL,
    "addressId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weddingId" TEXT NOT NULL,

    CONSTRAINT "WeddingInvitationResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestWeddingResponse" (
    "id" TEXT NOT NULL,
    "remarks" TEXT,
    "guestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "weddingInvitationResponseId" TEXT,

    CONSTRAINT "GuestWeddingResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuestDayPartPresent" (
    "id" TEXT NOT NULL,
    "guestWeddingResponseStatus" "GuestWeddingResponseStatus" NOT NULL DEFAULT 'UNKNOWN',
    "guestWeddingResponseId" TEXT,
    "weddingDayPartId" TEXT NOT NULL,
    "guestId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestDayPartPresent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuestGroup_addressId_key" ON "GuestGroup"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_guestGroupId_key" ON "Address"("guestGroupId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_weddingInvitationResponseId_key" ON "Address"("weddingInvitationResponseId");

-- CreateIndex
CREATE UNIQUE INDEX "WeddingInvitationResponse_addressId_key" ON "WeddingInvitationResponse"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "GuestWeddingResponse_guestId_key" ON "GuestWeddingResponse"("guestId");

-- AddForeignKey
ALTER TABLE "GuestGroup" ADD CONSTRAINT "GuestGroup_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_guestGroupId_fkey" FOREIGN KEY ("guestGroupId") REFERENCES "GuestGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_weddingInvitationResponseId_fkey" FOREIGN KEY ("weddingInvitationResponseId") REFERENCES "WeddingInvitationResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_guestGroupId_fkey" FOREIGN KEY ("guestGroupId") REFERENCES "GuestGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeddingInvitationResponse" ADD CONSTRAINT "WeddingInvitationResponse_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestWeddingResponse" ADD CONSTRAINT "GuestWeddingResponse_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestWeddingResponse" ADD CONSTRAINT "GuestWeddingResponse_weddingInvitationResponseId_fkey" FOREIGN KEY ("weddingInvitationResponseId") REFERENCES "WeddingInvitationResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestDayPartPresent" ADD CONSTRAINT "GuestDayPartPresent_guestWeddingResponseId_fkey" FOREIGN KEY ("guestWeddingResponseId") REFERENCES "GuestWeddingResponse"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestDayPartPresent" ADD CONSTRAINT "GuestDayPartPresent_weddingDayPartId_fkey" FOREIGN KEY ("weddingDayPartId") REFERENCES "WeddingDayPart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GuestDayPartPresent" ADD CONSTRAINT "GuestDayPartPresent_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "Guest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
