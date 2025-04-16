import { Body, Controller,Post } from "@nestjs/common";
import { TrafficStatusRepository } from "./index.repository";
import { trafficStatusFindManyArgs } from "src/modules/prisma/prisma.service";

@Controller('trafficStatus')
export class TrafficStatusController{
    constructor(private repository:TrafficStatusRepository){}

    @Post()
    async getTrafficStatus(@Body()props:trafficStatusFindManyArgs){
        console.log(props)
        const result = await this.repository.getTrafficStatus(props)
        console.log(result)
        return result
    }
}