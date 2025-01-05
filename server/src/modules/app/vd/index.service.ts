import { Injectable } from "@nestjs/common";
import { VdRepository } from "./index.repository";
import { OnModuleInit } from "@nestjs/common";

@Injectable()
export class VdService{
    constructor(private repository:VdRepository){}

    async getPanel(roadId:number){
        const result = await this.repository.getPanel({where:{roadId:roadId}})
        if(result.length!=0)
            return result[0]
        else
        {
            await this.repository.insertPanel([{roadId:roadId}])
            const panel = await this.repository.getPanel({where:{roadId:roadId}})
            return panel[0]
        }
            

    }

}