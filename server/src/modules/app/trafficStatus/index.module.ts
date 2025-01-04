import { Module } from "@nestjs/common";
import { PrismaModule } from "src/modules/prisma/prisma.module";
import { TrafficStatusRepository } from "./index.repository";
import { TrafficStatusTask } from "./index.task";
import { HttpClientModule } from "src/core/httpClient/index.module";
import { MyLoggerModule } from "src/core/myLogger/index.module";
import { TrafficStatusController } from "./index.controller";

@Module({
    imports:[PrismaModule,HttpClientModule,MyLoggerModule],
    providers:[TrafficStatusRepository,TrafficStatusTask],
    exports:[TrafficStatusRepository],
    controllers:[TrafficStatusController]
})
export class TrafficStatusModule{};