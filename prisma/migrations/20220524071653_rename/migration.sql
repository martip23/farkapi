-- RenameForeignKey
ALTER TABLE "ServerUsername" RENAME CONSTRAINT "ServerUsername_userDiscordId_fkey" TO "ServerUsername_discordId_fkey";
