/*
  Warnings:

  - Added the required column `location` to the `road` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cctv" ALTER COLUMN "videoStreamUrl" DROP NOT NULL,
ALTER COLUMN "direction" DROP NOT NULL;

-- AlterTable
ALTER TABLE "road" ADD COLUMN     "location" VARCHAR(255) NOT NULL;
