import { Injectable,OnModuleInit } from "@nestjs/common";
import { VdRepository } from "./index.repository";
import { min,vdDynamicUrls } from "src/app.setting";
import { HttpClientService } from "src/core/httpClient/index.service";
import { parseStringPromise } from "xml2js";
import { MyLoggerService } from "src/core/myLogger/index.service";


@Injectable()
export class VdTask implements OnModuleInit{

    constructor(private repository:VdRepository,private http:HttpClientService,private logger:MyLoggerService){}

    onModuleInit() {
      setInterval(()=>{
        this.getVdDynamicData()
      },min)  
    }

    async getVdDynamicData(){
        let devices = await this.repository.getDevice()
        let roads = await this.repository.getRoad()
        let trafficDatas = []
        for(const dynamicUrl of vdDynamicUrls){
            try{
                const res = await this.http.get(dynamicUrl)
                const result = await parseStringPromise(res,{explicitArray:false});
                const vdLives = result?.VDLiveList?.VDLives?.VDLive
                if(!vdLives)
                {
                    this.logger.error(`${dynamicUrl} VDLive is null`)
                    continue
                }
                for(const vdLive of vdLives){
                    const trafficDataTemplate = {}
                    trafficDataTemplate['VDID'] = vdLive['VDID']
                    trafficDataTemplate['Status'] = Number(vdLive['Status'])
                    trafficDataTemplate['DataCollectTime'] = new Date(vdLive['DataCollectTime'])
                    let linkFlows = vdLive?.LinkFlows?.LinkFlow
                    if(!linkFlows)
                    {
                        this.logger.error(`${dynamicUrl},VD-${vdLive.VDID}, LinkFlow is null`)
                        continue
                    }
                    if(!Array.isArray(linkFlows))
                        linkFlows = [linkFlows]
                    for(const linkFlow of linkFlows){
                        trafficDataTemplate['LinkID'] = linkFlow['LinkID']
                        let lanes = linkFlow?.Lanes?.Lane
                        if(!lanes)
                        {
                            this.logger.error(`dynamic data in ${dynamicUrl} with VDID:${vdLive.VDID} and LinkID:${linkFlow['LinkID']} has no lanes`)
                            continue
                        }
                        if(!Array.isArray(lanes))
                            lanes = [lanes]
                        for(const lane of lanes){
                            const trafficData = {...trafficDataTemplate}
                            trafficData['LaneID'] = Number(lane['LaneID'])
                            trafficData['LaneType'] = Number(lane['LaneType'])
                            trafficData['Speed'] = Number(lane['Speed'])
                            trafficData['Occupancy'] = Number(lane['Occupancy'])
                            trafficData['Volume'] = 0
                            let vehicles = lane?.Vehicles?.Vehicle
                            if(!vehicles)
                            {
                                this.logger.error(`dynamic data in ${dynamicUrl} with VDID:${vdLive.VDID} and LinkID:${linkFlow['LinkID']} and lane ${lane} has no vehicle`)
                                continue
                            }
                            if(!Array.isArray(vehicles))
                                vehicles = [vehicles]
                            for(const vehicle of vehicles){
                                if(!vehicle['VehicleType'])
                                    continue
                                trafficData[`${vehicle['VehicleType']}Volume`] = Number(vehicle['Volume'])
                                trafficData[`${vehicle['VehicleType']}Speed`] = Number(vehicle['Speed'])
                                trafficData['Volume']+=Number(vehicle['Volume'])
                            }
                            trafficDatas.push(trafficData)
                        }
                        
                        
                    }


                }


            }
            catch(error){
                this.logger.error(`fetch dynamic data in ${dynamicUrl} error`)
            }
        }
        const insertDevices = trafficDatas.filter(trafficData=>!devices.find(item=>item.VDID==trafficData.VDID))
        const insertRoads = trafficDatas.filter(trafficData=>!roads.find(item=>item.LinkID==trafficData.LinkID))
        if(insertDevices.length>0){
            const insertVDIDs = insertDevices.map(item=>({VDID:item.VDID}))
            await this.repository.insertDevice(insertVDIDs)
            for(const insertVDID of insertVDIDs){
                await this.logger.info(`insert VDID ${insertVDID}`)
            }
        }   
        if(insertRoads.length>0){
            devices = await this.repository.getDevice()
            const insertLinkIds = insertDevices.map(item=>({LinkID:item.LinkId,VDID:item.VDID,location:'請修改此位置'}))
            await this.repository.insertRoad(insertLinkIds)
            for(const insertLinkId of insertLinkIds){
                await this.logger.info(`insert LinkId ${insertLinkId}`)
            }
        }
        roads = await this.repository.getRoad()

        for(const trafficData of trafficDatas){
            const road = roads.find(item=>item.LinkID==trafficData.LinkID)
            trafficData['roadId'] = road?.id
            delete trafficData['VDID']
            delete trafficData['LinkID']
        }

        await this.repository.insertTraffic(trafficDatas.filter(item=>item.roadId))
        await this.logger.info(`insert ${trafficDatas.length} VD data successful!`)
        
    }
}