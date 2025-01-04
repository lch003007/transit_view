-- CreateTable
CREATE TABLE "panel" (
    "id" SERIAL NOT NULL,
    "roadId" INTEGER NOT NULL,
    "intervalTime0" INTEGER NOT NULL,
    "flowGate0" INTEGER NOT NULL,
    "rateGate0" INTEGER NOT NULL,
    "intervalTime1" INTEGER NOT NULL,
    "flowGate1" INTEGER NOT NULL,
    "rateGate1" INTEGER NOT NULL,
    "intervalTime2" INTEGER NOT NULL,
    "flowGate2" INTEGER NOT NULL,
    "rateGate2" INTEGER NOT NULL,
    "intervalTime3" INTEGER NOT NULL,
    "flowGate3" INTEGER NOT NULL,
    "rateGate3" INTEGER NOT NULL,
    "lineAlert" BOOLEAN NOT NULL,
    "alert" BOOLEAN NOT NULL,

    CONSTRAINT "panel_pkey" PRIMARY KEY ("id")
);
