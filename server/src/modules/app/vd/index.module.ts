import { Module } from "@nestjs/common";
import { VdRepository } from "./index.repository";
import { PrismaModule } from "src/modules/prisma/prisma.module";
import { VdController } from "./index.controller";
import { VdTask } from "./index.task";
import { HttpClientModule } from "src/core/httpClient/index.module";
import { MyLoggerModule } from "src/core/myLogger/index.module";

@Module({
    imports:[PrismaModule,HttpClientModule,MyLoggerModule],
    providers:[VdRepository,VdTask],
    exports:[VdRepository],
    controllers:[VdController]
})

export class VdModule{};