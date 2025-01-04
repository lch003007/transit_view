-- CreateEnum
CREATE TYPE "LogLevel" AS ENUM ('TRACE', 'DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL', 'ALERT', 'EMERGENCY');

-- CreateTable
CREATE TABLE "systemLog" (
    "id" SERIAL NOT NULL,
    "level" "LogLevel" NOT NULL,
    "scope" VARCHAR(255) NOT NULL,
    "message" VARCHAR(255) NOT NULL,
    "details" JSONB,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "systemLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "systemLog_level_created_idx" ON "systemLog"("level", "created");
