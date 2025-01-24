/*
  Warnings:

  - You are about to drop the column `panelIds` on the `panelGroup` table. All the data in the column will be lost.
  - Added the required column `roadIds` to the `panelGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "panelGroup" DROP COLUMN "panelIds",
ADD COLUMN     "roadIds" VARCHAR(255) NOT NULL;
