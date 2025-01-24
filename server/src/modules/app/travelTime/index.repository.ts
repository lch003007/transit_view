import { Injectable } from "@nestjs/common";
import { PrismaService, travelGroupCreateManyData, travelGroupDeleteManyArgs, travelGroupFindManyArgs, travelGroupUpdateManyArgs, travelSegmentCreateManyData, travelSegmentDeleteManyArgs, travelSegmentFindManyArgs, travelSegmentUpdateManyArgs, travelTimeRecordCreateManyData, travelTimeRecordFindManyArgs,

 } from "src/modules/prisma/prisma.service";


@Injectable()
export class TravelTimeRepository{
    constructor(private prisma:PrismaService){}

    async getTravelSegment(props:travelSegmentFindManyArgs={}){
        return this.prisma.executeOperation(props,'travelSegment','findMany')
    }

    async insertTravelSegment(data:travelSegmentCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'travelSegment','createMany')
    }

    async updateTravelSegment(props:travelSegmentUpdateManyArgs){
        return this.prisma.executeOperation(props,'travelSegment','updateMany')
    }

    async deleteTravelSegment(props:travelSegmentDeleteManyArgs){
        return this.prisma.executeOperation(props,'travelSegment','deleteMany')
    }

    async insertTravelTimeRecord(data:travelTimeRecordCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'travelTimeRecord','createMany')
    }

    async getTravelTimeRecord(props:travelTimeRecordFindManyArgs={}){
        return this.prisma.executeOperation(props,'travelTimeRecord','findMany')
    }

    async getTravelGroup(props:travelGroupFindManyArgs={}){
        return this.prisma.executeOperation(props,'travelGroup','findMany')
    }

    async insertTravelGroup(data:travelGroupCreateManyData,skipDuplicates:boolean=false){
        return this.prisma.executeOperation({data:data,skipDuplicates:skipDuplicates},'travelGroup','createMany')
    }

    async updateTravelGroup(props:travelGroupUpdateManyArgs){
        return this.prisma.executeOperation(props,'travelGroup','updateMany')
    }

    async deleteTravelGroup(props:travelGroupDeleteManyArgs){
        return this.prisma.executeOperation(props,'travelGroup','deleteMany')
    }

}
