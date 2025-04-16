import { Injectable,OnModuleInit } from "@nestjs/common";
import { TrafficStatusRepository } from "./index.repository";
import { MyLoggerService } from "src/core/myLogger/index.service";
import { HttpClientService } from "src/core/httpClient/index.service";
import { hour, trafficStatusUrl } from "src/app.setting";

@Injectable()
export class TrafficStatusTask implements OnModuleInit{
    constructor(private repository:TrafficStatusRepository,private logger:MyLoggerService,private http:HttpClientService){}
    onModuleInit() {
        this.getTrafficStatus()
        setInterval(()=>{
            this.getTrafficStatus()
        },hour)
    }
    async getTrafficStatus(){
        const dbTrafficStatus = await this.repository.getTrafficStatus()
        try{
            const result = await this.http.get(trafficStatusUrl)
            let trafficStatusDatas = []
            result.map(item=>{
    
                if(!item.happendate||!item.happentime)
                    return 
    
                trafficStatusDatas.push({
                    srcdetail: item['srcdetail'],
                    eventTime: new Date(`${item.happendate}T${item.happentime.slice(0,8)}`),
                    roadtype: item['roadtype'],
                    UID: item['UID'],
                    road: item['road'],
                    areaNm: item['areaNm'],
                    y1: Number(item['y1']),
                    modDttm: new Date(item['modDttm'].replace(' ','T')),
                    x1: Number(item['x1']),
                    comment:item['comment']
                })
            })
            trafficStatusDatas = trafficStatusDatas.filter(trafficStatusData=>!dbTrafficStatus.find(item=>item.UID==trafficStatusData.UID))
            await this.repository.insertTrafficStatus(trafficStatusDatas)
            this.logger.info('update traffic status data successful!')
        }catch(error){
            this.logger.error('update traffic status data false')
        }

        
        //初始化警廣資料,存到資料庫
    }
}