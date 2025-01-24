/*
  Warnings:

  - You are about to drop the `CctvGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RoadGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CctvGroup";

-- DropTable
DROP TABLE "RoadGroup";

-- CreateTable
CREATE TABLE "cctvGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '新增群組',
    "cctvIds" VARCHAR(255) NOT NULL,

    CONSTRAINT "cctvGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "panelGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '新增群組',
    "panelIds" VARCHAR(255) NOT NULL,

    CONSTRAINT "panelGroup_pkey" PRIMARY KEY ("id")
);
