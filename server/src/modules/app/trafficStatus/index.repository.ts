import { Injectable } from "@nestjs/common";
import { PrismaService, trafficStatusCreateManyData, trafficStatusFindManyArgs } from "src/modules/prisma/prisma.service";

@Injectable()
export class TrafficStatusRepository{
    constructor(private prisma:PrismaService){}
    async insertTrafficStatus(data:trafficStatusCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'trafficStatus','createMany')
    }

    async getTrafficStatus(props:trafficStatusFindManyArgs={}){
        return this.prisma.executeOperation(props,'trafficStatus','findMany')
    }

}