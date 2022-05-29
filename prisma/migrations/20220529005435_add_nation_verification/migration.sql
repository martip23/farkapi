/*
  Warnings:

  - A unique constraint covering the columns `[nationApiKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ServerUsername" ADD COLUMN     "roles" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "nationApiKey" BOOLEAN,
ADD COLUMN     "nationVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_nationApiKey_key" ON "User"("nationApiKey");
