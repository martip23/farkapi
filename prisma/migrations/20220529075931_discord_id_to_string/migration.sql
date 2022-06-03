/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ServerUsername" DROP CONSTRAINT "ServerUsername_discordId_fkey";

-- AlterTable
ALTER TABLE "ServerUsername" ALTER COLUMN "discordId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "discordId" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("discordId");

-- AddForeignKey
ALTER TABLE "ServerUsername" ADD CONSTRAINT "ServerUsername_discordId_fkey" FOREIGN KEY ("discordId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;
