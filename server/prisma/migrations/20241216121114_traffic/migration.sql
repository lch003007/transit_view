-- CreateTable
CREATE TABLE "Traffic" (
    "id" SERIAL NOT NULL,
    "roadId" INTEGER NOT NULL,
    "LaneID" INTEGER,
    "LaneType" INTEGER,
    "Speed" DOUBLE PRECISION,
    "Volume" INTEGER,
    "Occupancy" DOUBLE PRECISION,
    "MVolume" INTEGER,
    "SVolume" INTEGER,
    "LVolume" INTEGER,
    "TVolume" INTEGER,
    "MSpeed" DOUBLE PRECISION,
    "SSpeed" DOUBLE PRECISION,
    "LSpeed" DOUBLE PRECISION,
    "TSpeed" DOUBLE PRECISION,
    "Status" INTEGER,
    "DataCollectTime" TIMESTAMP(3),

    CONSTRAINT "Traffic_pkey" PRIMARY KEY ("id")
);
