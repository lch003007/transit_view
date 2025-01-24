import { Injectable } from "@nestjs/common";
import { PrismaService,
    deviceCreateManyData,
    deviceDeleteManyArgs,
    deviceFindManyArgs,
    deviceUpdateManyArgs,
    panelCreateManyData,
    panelDeleteManyArgs,
    panelFindManyArgs,
    panelGroupCreateManyData,
    panelGroupDeleteManyArgs,
    panelGroupFindManyArgs,
    panelGroupUpdateManyArgs,
    panelUpdateManyArgs,
    roadCreateManyData,
    roadDeleteManyArgs,
    roadFindManyArgs,
    roadUpdateManyArgs,
    trafficCreateManyData,
    trafficFindManyArgs
 } from "src/modules/prisma/prisma.service";


@Injectable()
export class VdRepository{
    constructor(private prisma:PrismaService){}
    async getDevice(props:deviceFindManyArgs={}){
        return this.prisma.executeOperation(props,'device','findMany')
    }

    async insertDevice(data:deviceCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'device','createMany')
    }

    async updateDevice(props:deviceUpdateManyArgs){
        return this.prisma.executeOperation(props,'device','updateMany')
    }

    async deleteDevice(props:deviceDeleteManyArgs){
        return this.prisma.executeOperation(props,'device','deleteMany')
    }

    async getRoad(props:roadFindManyArgs={}){
        return this.prisma.executeOperation(props,'road','findMany')
    }

    async insertRoad(data:roadCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'road','createMany')
    }

    async updateRoad(props:roadUpdateManyArgs){
        return this.prisma.executeOperation(props,'road','updateMany')
    }

    async deleteRoad(props:roadDeleteManyArgs){
        return this.prisma.executeOperation(props,'road','deleteMany')
    }

    async getTraffic(props:trafficFindManyArgs={}){
        return this.prisma.executeOperation(props,'traffic','findMany')
    }


    async insertTraffic(data:trafficCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'traffic','createMany')
    }

    async getPanel(props:panelFindManyArgs={}){
        return this.prisma.executeOperation(props,'panel','findMany')
    }

    async insertPanel(data:panelCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'panel','createMany')
    }

    async updatePanel(props:panelUpdateManyArgs){
        return this.prisma.executeOperation(props,'panel','updateMany')
    }

    async deletePanel(props:panelDeleteManyArgs){
        return this.prisma.executeOperation(props,'panel','deleteMany')
    }

    async getPanelGroup(props:panelGroupFindManyArgs={}){
        return this.prisma.executeOperation(props,'panelGroup','findMany')
    }

    async insertPanelGroup(data:panelGroupCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'panelGroup','createMany')
    }

    async updatePanelGroup(props:panelGroupUpdateManyArgs){
        return this.prisma.executeOperation(props,'panelGroup','updateMany')
    }

    async deletePanelGroup(props:panelGroupDeleteManyArgs){
        return this.prisma.executeOperation(props,'panelGroup','deleteMany')
    }


}