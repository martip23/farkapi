-- CreateTable
CREATE TABLE "User" (
    "discordId" INTEGER NOT NULL,
    "farkId" SERIAL NOT NULL,
    "nationId" INTEGER NOT NULL,
    "discordName" TEXT NOT NULL,
    "nationName" TEXT NOT NULL,
    "nationUsername" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("discordId")
);

-- CreateTable
CREATE TABLE "ServerUsername" (
    "id" INTEGER NOT NULL,
    "userDiscordId" INTEGER NOT NULL,
    "guildId" INTEGER NOT NULL,
    "serverName" TEXT NOT NULL,
    "serverUsername" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ServerUsername_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationId_key" ON "User"("nationId");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordName_key" ON "User"("discordName");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationName_key" ON "User"("nationName");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationUsername_key" ON "User"("nationUsername");

-- AddForeignKey
ALTER TABLE "ServerUsername" ADD CONSTRAINT "ServerUsername_userDiscordId_fkey" FOREIGN KEY ("userDiscordId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;
