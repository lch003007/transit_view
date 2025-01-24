import { Body, Controller,Post } from "@nestjs/common";
import { CctvRepository } from "./index.repository";
import { cctvCreateManyData, cctvDeleteManyArgs, cctvFindManyArgs, cctvGroupCreateManyData, cctvGroupDeleteManyArgs, cctvGroupFindManyArgs, cctvGroupUpdateManyArgs, cctvUpdateManyArgs } from "src/modules/prisma/prisma.service";

@Controller('cctv')
export class CctvController{
    constructor(private repository:CctvRepository){}

    @Post()
    async getCctv(@Body()props?:cctvFindManyArgs){
        return this.repository.getCctv(props)
    }

    @Post('insert')
    async insertCctv(@Body()props:cctvCreateManyData){
        console.log(props)
        return this.repository.insertCctv(props)
    }
    
    @Post('update')
    async updateCctv(@Body()props:cctvUpdateManyArgs){
        return this.repository.updateCctv(props)
    }

    @Post('delete')
    async deleteCctv(@Body()props:cctvDeleteManyArgs){
        return this.repository.deleteCctv(props)
    }

    @Post('group')
    async getCctvGroup(@Body()props?:cctvGroupFindManyArgs){
        return this.repository.getCctvGroup(props)
    }

    @Post('group/insert')
    async insertCctvGroup(@Body()props:cctvGroupCreateManyData){
        console.log(props)
        return this.repository.insertCctvGroup(props)
    }
    
    @Post('group/update')
    async updateCctvGroup(@Body()props:cctvGroupUpdateManyArgs){
        return this.repository.updateCctvGroup(props)
    }

    @Post('group/delete')
    async deleteCctvGroup(@Body()props:cctvGroupDeleteManyArgs){
        return this.repository.deleteCctvGroup(props)
    }

}