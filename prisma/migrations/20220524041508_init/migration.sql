/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `ServerUsername` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE "serverusername_id_seq";
ALTER TABLE "ServerUsername" ALTER COLUMN "id" SET DEFAULT nextval('serverusername_id_seq');
ALTER SEQUENCE "serverusername_id_seq" OWNED BY "ServerUsername"."id";

-- CreateIndex
CREATE UNIQUE INDEX "ServerUsername_id_key" ON "ServerUsername"("id");
