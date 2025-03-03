import { Controller, Get,Post,Body } from '@nestjs/common';
import { TravelTimeRepository} from './index.repository';
import { TravelTimeService } from './index.service';
import { travelGroupCreateManyData, travelGroupDeleteManyArgs, travelGroupUpdateManyArgs, travelSegmentCreateManyData, travelSegmentDeleteManyArgs, travelSegmentUpdateManyArgs } from 'src/modules/prisma/prisma.service';

@Controller('travelTime')
export class TravelTimeController {
  constructor(private repository:TravelTimeRepository,private service:TravelTimeService) {}
  @Post('predict')
  async getReadTravelTime(){
    return await this.service.getRealTravelTime()
  }

  @Post('normal')
  async getNormalTravelTime(){
    return await this.service.getNormalTravelTime()
  }

  @Post()
  async getData(){
    return await this.repository.getTravelSegment()
  }

  @Post('insert')
  async insertTravelTime(@Body()props:travelSegmentCreateManyData){
    return this.repository.insertTravelSegment(props)
  }

  @Post('update')
  async updateTravelTime(@Body()props:travelSegmentUpdateManyArgs){
    return this.repository.updateTravelSegment(props)
  }

  
  @Post('delete')
  async deleteTravelTime(@Body()props:travelSegmentDeleteManyArgs){
    return this.repository.deleteTravelSegment(props)
  }

  @Post('volume/predict')
  async getVolumePredict(@Body()props:any){
    return this.service.getVolumePredict(props.where.date)
  }

  @Post('group')
  async getGroup(){
    return await this.repository.getTravelGroup()
  }

  @Post('group/insert')
  async insertGroup(@Body()props:travelGroupCreateManyData){
    return this.repository.insertTravelGroup(props)
  }

  @Post('group/update')
  async updateGroup(@Body()props:travelGroupUpdateManyArgs){
    return this.repository.updateTravelGroup(props)
  }

  @Post('group/delete')
  async deleteGroup(@Body()props:travelGroupDeleteManyArgs){
    return this.repository.deleteTravelGroup(props)
  }

}
