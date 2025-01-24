import { Module } from "@nestjs/common";
import { CctvRepository } from "./index.repository";
import { CctvTask } from "./index.task";
import { PrismaModule } from "src/modules/prisma/prisma.module";
import { CctvController } from "./index.controller";
import { CctvSerivce } from "./index.service";
import { HttpClientModule } from "src/core/httpClient/index.module";

@Module({
    providers:[CctvRepository,CctvTask,CctvSerivce],
    imports:[PrismaModule,HttpClientModule],
    controllers:[CctvController]
})

export class CctvModule{}