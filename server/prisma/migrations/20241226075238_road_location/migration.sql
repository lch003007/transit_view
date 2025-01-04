/*
  Warnings:

  - You are about to drop the column `deviceId` on the `road` table. All the data in the column will be lost.
  - Added the required column `VDID` to the `road` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "road" DROP COLUMN "deviceId",
ADD COLUMN     "VDID" VARCHAR(255) NOT NULL;
