/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Lawyer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[razorpayAccountId]` on the table `Lawyer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Lawyer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentPurpose" AS ENUM ('SUBSCRIPTION', 'LAWYER_BOOKING', 'MEDIATION');

-- AlterTable
ALTER TABLE "Conversation" ADD COLUMN     "lawyerId" INTEGER,
ADD COLUMN     "mediatorId" INTEGER;

-- AlterTable
ALTER TABLE "Lawyer" ADD COLUMN     "payoutEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "razorpayAccountId" TEXT,
ADD COLUMN     "subscription" "Subscription" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "success" BOOLEAN NOT NULL,
    "purpose" "PaymentPurpose" NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mediator" (
    "id" SERIAL NOT NULL,
    "partyAId" INTEGER NOT NULL,
    "partyBId" INTEGER NOT NULL,
    "lawyerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mediator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lawyer_userId_key" ON "Lawyer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Lawyer_razorpayAccountId_key" ON "Lawyer"("razorpayAccountId");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_mediatorId_fkey" FOREIGN KEY ("mediatorId") REFERENCES "Mediator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "Lawyer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lawyer" ADD CONSTRAINT "Lawyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mediator" ADD CONSTRAINT "Mediator_partyAId_fkey" FOREIGN KEY ("partyAId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mediator" ADD CONSTRAINT "Mediator_partyBId_fkey" FOREIGN KEY ("partyBId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mediator" ADD CONSTRAINT "Mediator_lawyerId_fkey" FOREIGN KEY ("lawyerId") REFERENCES "Lawyer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
