import { Module } from "@nestjs/common";
import { TravelTimeRepository} from "./index.repository";
import { PrismaModule } from "src/modules/prisma/prisma.module";
import { TravelTimeController } from "./index.controller";
import { HttpClientModule } from "src/core/httpClient/index.module";
import { MyLoggerModule } from "src/core/myLogger/index.module";
import { Client } from "@googlemaps/google-maps-services-js";
import { TravelTimeService } from "./index.service";
import { TravelTimeApi } from "./index.api";

@Module({
    imports:[PrismaModule,HttpClientModule,MyLoggerModule],
    providers:[TravelTimeRepository,TravelTimeApi,TravelTimeService,{
        provide:Client,
        useValue:new Client()
    }],
    controllers:[TravelTimeController]
})

export class TravelTimeModule{};