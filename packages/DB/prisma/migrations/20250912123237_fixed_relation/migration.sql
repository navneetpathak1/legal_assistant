-- DropForeignKey
ALTER TABLE "Lawyer" DROP CONSTRAINT "Lawyer_userId_fkey";

-- AlterTable
ALTER TABLE "Lawyer" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
