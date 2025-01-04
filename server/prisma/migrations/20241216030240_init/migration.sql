-- CreateTable
CREATE TABLE "cctv" (
    "id" SERIAL NOT NULL,
    "cctvId" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255),
    "roadId" VARCHAR(255),
    "roadName" VARCHAR(255),
    "positionLat" DOUBLE PRECISION,
    "positionLon" DOUBLE PRECISION,
    "videoStreamUrl" VARCHAR(255) NOT NULL,

    CONSTRAINT "cctv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device" (
    "id" SERIAL NOT NULL,
    "VDID" VARCHAR(255) NOT NULL,
    "SubAuthorityCode" VARCHAR(255),
    "BiDirectional" BOOLEAN,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "road" (
    "id" SERIAL NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "LinkID" VARCHAR(255) NOT NULL,
    "Bearing" VARCHAR(255),
    "RoadDirection" VARCHAR(255),
    "LaneNum" INTEGER,
    "ActualLaneNum" INTEGER,

    CONSTRAINT "road_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trafficStatus" (
    "id" INTEGER NOT NULL,
    "incidentType" VARCHAR(255) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "source" VARCHAR(255) NOT NULL,

    CONSTRAINT "trafficStatus_pkey" PRIMARY KEY ("id")
);
