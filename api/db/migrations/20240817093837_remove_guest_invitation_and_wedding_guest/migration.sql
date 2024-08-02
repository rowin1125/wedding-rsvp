/*
  Warnings:

  - You are about to drop the `WeddingGuest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WeddingInvitation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WeddingGuest" DROP CONSTRAINT "WeddingGuest_weddingId_fkey";

-- DropForeignKey
ALTER TABLE "WeddingGuest" DROP CONSTRAINT "WeddingGuest_weddingInvitationId_fkey";

-- DropForeignKey
ALTER TABLE "WeddingInvitation" DROP CONSTRAINT "WeddingInvitation_weddingId_fkey";

-- DropTable
DROP TABLE "WeddingGuest";

-- DropTable
DROP TABLE "WeddingInvitation";
