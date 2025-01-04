/*
  Warnings:

  - You are about to drop the `systemLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `trafficStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "systemLog";

-- DropTable
DROP TABLE "trafficStatus";

-- CreateTable
CREATE TABLE "traffic_status" (
    "id" INTEGER NOT NULL,
    "incidentType" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "source" VARCHAR(255) NOT NULL,

    CONSTRAINT "traffic_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_log" (
    "id" SERIAL NOT NULL,
    "level" "LogLevel" NOT NULL,
    "scope" VARCHAR(255) NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "details" JSONB,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "system_log_level_created_idx" ON "system_log"("level", "created");
