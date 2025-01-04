/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `travel_segments` table. All the data in the column will be lost.
  - You are about to alter the column `travelTime` on the `travel_segments` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "travel_segments" DROP COLUMN "updatedAt",
ALTER COLUMN "travelTime" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "travel_time_record" (
    "id" SERIAL NOT NULL,
    "travelSegmentId" INTEGER NOT NULL,
    "travelTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "travel_time_record_pkey" PRIMARY KEY ("id")
);
