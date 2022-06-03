-- CreateTable
CREATE TABLE "User" (
    "discordId" BIGINT NOT NULL,
    "farkId" SERIAL NOT NULL,
    "discordName" TEXT NOT NULL,
    "nationUsername" TEXT,
    "nationName" TEXT,
    "nationId" INTEGER,
    "nationVerified" BOOLEAN NOT NULL DEFAULT false,
    "nationApiKey" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("discordId")
);

-- CreateTable
CREATE TABLE "ServerUsername" (
    "id" SERIAL NOT NULL,
    "discordId" BIGINT NOT NULL,
    "guildId" INTEGER NOT NULL,
    "serverName" TEXT NOT NULL,
    "serverUsername" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "roles" TEXT[],

    CONSTRAINT "ServerUsername_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "User_discordName_key" ON "User"("discordName");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationUsername_key" ON "User"("nationUsername");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationName_key" ON "User"("nationName");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationId_key" ON "User"("nationId");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationApiKey_key" ON "User"("nationApiKey");

-- CreateIndex
CREATE UNIQUE INDEX "ServerUsername_id_key" ON "ServerUsername"("id");

-- AddForeignKey
ALTER TABLE "ServerUsername" ADD CONSTRAINT "ServerUsername_discordId_fkey" FOREIGN KEY ("discordId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;
