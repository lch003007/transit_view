import { Controller, Get,Post,Body } from '@nestjs/common';
import { VdRepository } from './index.repository';
import { deviceCreateManyData, deviceDeleteManyArgs, deviceFindManyArgs, deviceUpdateManyArgs, panelCreateManyData, panelDeleteManyArgs, panelFindManyArgs, panelUpdateManyArgs, roadCreateManyData, roadDeleteManyArgs, roadFindManyArgs, roadUpdateManyArgs } from 'src/modules/prisma/prisma.service';

@Controller('vd')
export class VdController {
  constructor(private repository:VdRepository) {}

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
  async getPanel(@Body()props?:panelFindManyArgs){
    return this.repository.getPanel(props)
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

}
