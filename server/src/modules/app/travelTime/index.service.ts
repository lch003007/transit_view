import { Injectable, OnModuleInit} from "@nestjs/common";

import { HttpClientService } from "src/core/httpClient/index.service";

import { MyLoggerService } from "src/core/myLogger/index.service";
import { TravelTimeRepository } from "./index.repository";

import { TravelTimeApi } from "./index.api";
import { volume } from "./volume";

@Injectable()
export class TravelTimeService{
    private interval:number=15
    constructor(private repository:TravelTimeRepository,private http:HttpClientService,private logger:MyLoggerService,private api:TravelTimeApi){}


    async getRealTravelTime(){
        const foreTimes = [0,5,15,30,60]
        const travelTimeRecord = await this.repository.getTravelTimeRecord({orderBy:{createdAt:'desc'},distinct:'travelSegmentId'})
        const travelSegments = await this.repository.getTravelSegment()
        if(travelTimeRecord.length!=0){
            const createdAt = travelTimeRecord[0]['createdAt']
            const now = new Date()
            const diffInMilliseconds = now.getTime() - createdAt.getTime();
            if (diffInMilliseconds <= this.interval * 60 * 1000) {
                return travelTimeRecord.map(item=>{
                    const data = travelSegments.filter(item1=>item1.id==item.travelSegmentId)[0]
                    return{
                        name:data.name,
                        ...item
                    }
                })
              }
        }

        for(const travelSegment of travelSegments){
            let index = 0
            const insertData = {travelSegmentId:travelSegment.id}
            for(const foreTime of foreTimes){
                const travelTime = await this.api.getTravelTime(travelSegment,travelSegment['middleX']&&travelSegment['middleY'],new Date(Date.now() + foreTime * 60 * 1000))
                insertData[`travelTime${index==0?``:`Predict${index}`}`] = travelTime
                index++
            }
            await this.repository.insertTravelTimeRecord([insertData])
        }

        const newTravelTimeRecord = await this.repository.getTravelTimeRecord({orderBy:{createdAt:'desc'},distinct:'travelSegmentId'})


        return newTravelTimeRecord.map(item=>{
            const data = travelSegments.filter(item1=>item1.id==item.travelSegmentId)[0]
            return{
                name:data.name,
                ...item
            }
        })



    }

    async getNormalTravelTime(){
        const travelSegments = await this.repository.getTravelSegment()
        
        const noTravelTimeSegments = travelSegments.filter(item=>!item.travelTime)
        if(noTravelTimeSegments.length==0)
        {
            return travelSegments.map(item=>({name:item.name,travelTime:item.travelTime}))
        }
            
        for(const travelSegment of noTravelTimeSegments){
            let travelTime = 0
            if(travelSegment['middleX']&&travelSegment['middleY'])
                {
                    travelTime = await this.api.getTravelTime(travelSegment,true)
                }
                else{
                    travelTime = await this.api.getTravelTime(travelSegment,false)
                }
                await this.repository.updateTravelSegment({where:{id:travelSegment.id},data:{travelTime:travelTime}})
        }

        const newResult = await this.repository.getTravelSegment()
        return newResult.map(item=>({name:item.name,travelTime:item.travelTime}))


    }

    async getVolumePredict(inputTimeString: string): Promise<any[]> {
        const inputTime = new Date(inputTimeString)
        const baseTime = new Date(inputTime.getTime() - inputTime.getTimezoneOffset() * 60000);
        baseTime.setMinutes(0, 0, 0); // 分秒設置為 0
      
        const results: any[] = [];
      
        ['south', 'north'].forEach((direction) => {
          const predictions = {
            road: '蘇花路廊',
            direction: direction=='south'?'往南':'往北',
            currentVolume: this.getPredictionForTime(baseTime, 0, direction), // 當前流量
            predict1Hour: this.getPredictionForTime(baseTime, 1, direction),
            predict3Hour: this.getPredictionForTime(baseTime, 3, direction),
            predict6Hour: this.getPredictionForTime(baseTime, 6, direction),
          };
          results.push(predictions);
        });

        return results;
      }
    
      private getPredictionForTime(baseTime: Date, hoursToAdd: number, direction: string): number {
        const futureTime = new Date(baseTime);
        futureTime.setHours(baseTime.getHours() + hoursToAdd);
    
        const isoTime = futureTime.toISOString().split('.')[0]; // 取得 ISO 時間格式並去掉毫秒部分
        return volume[direction]?.[isoTime] ?? '無數據'; // 如果時間不存在，回傳 NaN
      }

    
}