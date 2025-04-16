import { Controller, Get,Post,Body } from '@nestjs/common';
import { VdRepository } from './index.repository';
import { deviceCreateManyData, deviceDeleteManyArgs, deviceFindManyArgs, deviceUpdateManyArgs, panelCreateManyData, panelDeleteManyArgs, panelFindManyArgs, panelGroupCreateManyData, panelGroupDeleteManyArgs, panelGroupFindManyArgs, panelGroupUpdateManyArgs, panelUpdateManyArgs, roadCreateManyData, roadDeleteManyArgs, roadFindManyArgs, roadUpdateManyArgs, trafficFindManyArgs } from 'src/modules/prisma/prisma.service';
import { VdService } from './index.service';

@Controller('vd')
export class VdController {
  constructor(private repository:VdRepository,private service:VdService) {}

  @Post('device')
  async getDevice(@Body()props?:deviceFindManyArgs){
    return this.repository.getDevice(props)
  }

  @Post('device/insert')
  async insertDevice(@Body()props:deviceCreateManyData){
    return this.repository.insertDevice(props)
  }


  @Post('device/update')
  async updateDevice(@Body()props:deviceUpdateManyArgs){
    return this.repository.updateDevice(props)
  }

  @Post('device/delete')
  async deleteDevice(@Body()props:deviceDeleteManyArgs){
    return this.repository.deleteDevice(props)
  }

  @Post('road')
  async getRoad(@Body()props?:roadFindManyArgs){
    return this.repository.getRoad(props)
  }

  @Post('road/insert')
  async insertRoad(@Body()props:roadCreateManyData){
    return this.repository.insertRoad(props)
  }

  @Post('road/update')
  async updateRoad(@Body()props:roadUpdateManyArgs){
    return this.repository.updateRoad(props)
  }

  @Post('road/delete')
  async deleteRoad(@Body()props:roadDeleteManyArgs){
    return this.repository.deleteRoad(props)
  }

  @Post('panel')
  async getPanel(@Body()data:any){

    return this.service.getPanel(data['roadId'])
  }

  @Post('panel/insert')
  async insertPanel(@Body()props:panelCreateManyData){
    return this.repository.insertPanel(props)
  }

  @Post('panel/update')
  async updatePanel(@Body()props:panelUpdateManyArgs){
    return this.repository.updatePanel(props)
  }

  @Post('panel/delete')
  async deletePanel(@Body()props:panelDeleteManyArgs){
    return this.repository.deletePanel(props)
  }

  @Post('traffic')
  async getTraffic(@Body()props:trafficFindManyArgs){
    return await this.repository.getTraffic(props)
  }

  @Post('panelGroup')
  async getPanelGroup(@Body()props?:panelGroupFindManyArgs){
    return this.repository.getPanelGroup(props)
  }

  @Post('panelGroup/insert')
  async insertPanelGroup(@Body()props:panelGroupCreateManyData){
    console.log(props)
    return this.repository.insertPanelGroup(props)
  }

  @Post('panelGroup/update')
  async updatePanelGroup(@Body()props:panelGroupUpdateManyArgs){
    return this.repository.updatePanelGroup(props)
  }

  @Post('panelGroup/delete')
  async deletePanelGroup(@Body()props:panelGroupDeleteManyArgs){
    return this.repository.deletePanelGroup(props)
  }

}
