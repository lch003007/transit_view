-- CreateTable
CREATE TABLE "TravelGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "segments" VARCHAR(255) NOT NULL,

    CONSTRAINT "TravelGroup_pkey" PRIMARY KEY ("id")
);
