-- CreateIndex
CREATE INDEX "Traffic_roadId_DataCollectTime_idx" ON "Traffic"("roadId", "DataCollectTime");

-- CreateIndex
CREATE INDEX "Traffic_roadId_idx" ON "Traffic"("roadId");
