/*
  Warnings:

  - You are about to drop the column `description` on the `traffic_status` table. All the data in the column will be lost.
  - You are about to drop the column `incidentType` on the `traffic_status` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `traffic_status` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `traffic_status` table. All the data in the column will be lost.
  - Added the required column `modDttm` to the `traffic_status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y1` to the `traffic_status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "traffic_status" DROP COLUMN "description",
DROP COLUMN "incidentType",
DROP COLUMN "location",
DROP COLUMN "source",
ADD COLUMN     "UID" VARCHAR(255),
ADD COLUMN     "areaNm" VARCHAR(255),
ADD COLUMN     "comment" VARCHAR(65535),
ADD COLUMN     "direction" VARCHAR(255),
ADD COLUMN     "modDttm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "region" VARCHAR(255),
ADD COLUMN     "road" VARCHAR(255),
ADD COLUMN     "roadtype" VARCHAR(255),
ADD COLUMN     "srcdetail" VARCHAR(255),
ADD COLUMN     "x1" DOUBLE PRECISION,
ADD COLUMN     "y1" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "eventTime" DROP NOT NULL;
