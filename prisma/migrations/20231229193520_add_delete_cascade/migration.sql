-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_brokerId_fkey";

-- DropForeignKey
ALTER TABLE "schedules" DROP CONSTRAINT "schedules_clientId_fkey";

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_brokerId_fkey" FOREIGN KEY ("brokerId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
