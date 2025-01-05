import { Module } from "@nestjs/common";
import { VdRepository } from "./index.repository";
import { PrismaModule } from "src/modules/prisma/prisma.module";
import { VdController } from "./index.controller";
import { VdTask } from "./index.task";
import { HttpClientModule } from "src/core/httpClient/index.module";
import { MyLoggerModule } from "src/core/myLogger/index.module";
import { VdService } from "./index.service";

@Module({
    imports:[PrismaModule,HttpClientModule,MyLoggerModule],
    providers:[VdRepository,VdTask,VdService],
    exports:[VdRepository],
    controllers:[VdController]
})

export class VdModule{};