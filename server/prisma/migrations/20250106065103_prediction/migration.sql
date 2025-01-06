-- AlterTable
ALTER TABLE "travel_time_record" ADD COLUMN     "travelTimePredict1" INTEGER,
ADD COLUMN     "travelTimePredict2" INTEGER,
ADD COLUMN     "travelTimePredict3" INTEGER,
ADD COLUMN     "travelTimePredict4" INTEGER,
ALTER COLUMN "travelTime" DROP NOT NULL;
