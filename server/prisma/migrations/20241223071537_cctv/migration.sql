/*
  Warnings:

  - Added the required column `direction` to the `cctv` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cctv" ADD COLUMN     "direction" VARCHAR(255) NOT NULL;
