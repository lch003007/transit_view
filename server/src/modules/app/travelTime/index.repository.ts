import { Injectable } from "@nestjs/common";
import { PrismaService, travelSegmentCreateManyData, travelSegmentDeleteManyArgs, travelSegmentFindManyArgs, travelSegmentUpdateManyArgs, travelTimeRecordCreateManyData, travelTimeRecordFindManyArgs,

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

}
