-- CreateTable
CREATE TABLE "CctvGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '新增群組',
    "cctvIds" VARCHAR(255) NOT NULL,

    CONSTRAINT "CctvGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL DEFAULT '新增群組',
    "roadIds" VARCHAR(255) NOT NULL,

    CONSTRAINT "RoadGroup_pkey" PRIMARY KEY ("id")
);
