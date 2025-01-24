import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { cctvCreateManyData, cctvDeleteManyArgs, cctvFindManyArgs, cctvGroupCreateManyData, cctvGroupDeleteManyArgs, cctvGroupFindManyArgs, cctvGroupUpdateManyArgs, cctvUpdateManyArgs, PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class CctvRepository{
    constructor(private prisma:PrismaService){}
    async getCctv(props:cctvFindManyArgs={}){
        return this.prisma.executeOperation(props,'cctv','findMany')
    }
    
    async insertCctv(data:cctvCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'cctv','createMany')
    }

    async updateCctv(props:cctvUpdateManyArgs){
        return this.prisma.executeOperation(props,'cctv','updateMany')
    }

    async deleteCctv(props:cctvDeleteManyArgs){
        return this.prisma.executeOperation(props,'cctv','deleteMany')
    }

    async getCctvGroup(props:cctvGroupFindManyArgs ={}){
        return this.prisma.executeOperation(props,'cctvGroup','findMany')
    }

    async insertCctvGroup(data:cctvGroupCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'cctvGroup','createMany')
    }

    async updateCctvGroup(props:cctvGroupUpdateManyArgs){
        return this.prisma.executeOperation(props,'cctvGroup','updateMany')
    }

    async deleteCctvGroup(props:cctvGroupDeleteManyArgs){
        return this.prisma.executeOperation(props,'cctvGroup','deleteMany')
    }
}