/*
  Warnings:

  - Added the required column `itemLength` to the `cctvGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemLength` to the `panelGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cctvGroup" ADD COLUMN     "itemLength" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "panelGroup" ADD COLUMN     "itemLength" INTEGER NOT NULL;
