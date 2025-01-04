/*
  Warnings:

  - You are about to drop the column `direction` on the `traffic_status` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `traffic_status` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE traffic_status_id_seq;
ALTER TABLE "traffic_status" DROP COLUMN "direction",
DROP COLUMN "region",
ALTER COLUMN "id" SET DEFAULT nextval('traffic_status_id_seq');
ALTER SEQUENCE traffic_status_id_seq OWNED BY "traffic_status"."id";
