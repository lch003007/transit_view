import { Module } from "@nestjs/common";
import { CctvRepository } from "./index.repository";
import { CctvTask } from "./index.task";
import { PrismaModule } from "src/modules/prisma/prisma.module";
import { CctvController } from "./index.controller";

@Module({
    providers:[CctvRepository,CctvTask],
    imports:[PrismaModule],
    controllers:[CctvController]
})

export class CctvModule{}