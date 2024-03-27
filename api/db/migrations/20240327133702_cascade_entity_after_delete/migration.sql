-- DropForeignKey
ALTER TABLE "WeddingGuest" DROP CONSTRAINT "WeddingGuest_weddingId_fkey";

-- DropForeignKey
ALTER TABLE "WeddingGuest" DROP CONSTRAINT "WeddingGuest_weddingInvitationId_fkey";

-- DropForeignKey
ALTER TABLE "WeddingInvitation" DROP CONSTRAINT "WeddingInvitation_weddingId_fkey";

-- AddForeignKey
ALTER TABLE "WeddingInvitation" ADD CONSTRAINT "WeddingInvitation_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeddingGuest" ADD CONSTRAINT "WeddingGuest_weddingInvitationId_fkey" FOREIGN KEY ("weddingInvitationId") REFERENCES "WeddingInvitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeddingGuest" ADD CONSTRAINT "WeddingGuest_weddingId_fkey" FOREIGN KEY ("weddingId") REFERENCES "Wedding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
