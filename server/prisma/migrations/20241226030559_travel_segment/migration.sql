-- CreateTable
CREATE TABLE "travel_segments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startX" DOUBLE PRECISION NOT NULL,
    "startY" DOUBLE PRECISION NOT NULL,
    "endX" DOUBLE PRECISION NOT NULL,
    "endY" DOUBLE PRECISION NOT NULL,
    "direction" TEXT NOT NULL,
    "travelTime" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "travel_segments_pkey" PRIMARY KEY ("id")
);
