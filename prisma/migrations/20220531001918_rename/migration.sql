/*
  Warnings:

  - You are about to drop the `ServerUsername` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ServerUsername" DROP CONSTRAINT "ServerUsername_discordId_fkey";

-- DropTable
DROP TABLE "ServerUsername";

-- CreateTable
CREATE TABLE "ServerData" (
    "id" SERIAL NOT NULL,
    "discordId" TEXT NOT NULL,
    "guildId" INTEGER NOT NULL,
    "serverName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roles" TEXT[],

    CONSTRAINT "ServerData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServerData_id_key" ON "ServerData"("id");

-- AddForeignKey
ALTER TABLE "ServerData" ADD CONSTRAINT "ServerData_discordId_fkey" FOREIGN KEY ("discordId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;
