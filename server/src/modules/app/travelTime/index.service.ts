import { Injectable,OnModuleInit } from "@nestjs/common";

import { min,vdDynamicUrls } from "src/app.setting";
import { HttpClientService } from "src/core/httpClient/index.service";
import { parseStringPromise } from "xml2js";
import { MyLoggerService } from "src/core/myLogger/index.service";
import { TravelTimeRepository } from "./index.repository";
import { googleMapApiKey } from "src/app.setting";
import { Client } from "@googlemaps/google-maps-services-js";

@Injectable()
export class TravelTimeService implements OnModuleInit{

    constructor(private repository:TravelTimeRepository,private http:HttpClientService,private logger:MyLoggerService,private googleMap:Client){}
    private interval:number=15

    onModuleInit() {
        this.googleMap = new Client()
    }
    async getRealTravelTime(){
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
                        travelTime:item.travelTime
                    }
                })
              }
        }

        
        for(const travelSegment of travelSegments){
            if(travelSegment['middleX']&&travelSegment['middleY'])
            {
                const res1 = await this.googleMap.distancematrix({
                    params:{
                        origins:[{lat:travelSegment['startX'],lng:travelSegment['startY']}],
                        destinations:[{lat:travelSegment['middleX'],lng:travelSegment['middleY']}],
                        key:googleMapApiKey.distanceMatrixService,
                        departure_time:new Date()
                    }
                })

                const res2 = await this.googleMap.distancematrix({
                    params:{
                        origins:[{lat:travelSegment['middleX'],lng:travelSegment['middleY']}],
                        destinations:[{lat:travelSegment['endX'],lng:travelSegment['endY']}],
                        key:googleMapApiKey.distanceMatrixService,
                        departure_time:new Date()
                    }
                })

                await this.repository.insertTravelTimeRecord([{
                    travelSegmentId:travelSegment.id,
                    travelTime:res1.data.rows[0].elements[0]['duration_in_traffic']['value']+res2.data.rows[0].elements[0]['duration_in_traffic']['value'],
                }]) 

            }
            else{
            const res = await this.googleMap.distancematrix({
                params:{
                    origins:[{lat:travelSegment['startX'],lng:travelSegment['startY']}],
                    destinations:[{lat:travelSegment['endX'],lng:travelSegment['endY']}],
                    key:googleMapApiKey.distanceMatrixService,
                    departure_time:new Date()
                }
            })
            
            await this.repository.insertTravelTimeRecord([{
                travelSegmentId:travelSegment.id,
                travelTime:res.data.rows[0].elements[0]['duration_in_traffic']['value'],
            }]) 
            }

        }

        const newTravelTimeRecord = await this.repository.getTravelTimeRecord({orderBy:{createdAt:'desc'},distinct:'travelSegmentId'})
        
        // console.log(newTravelTimeRecord.map(item=>{
        //     const data = travelSegments.filter(item1=>item1.id==item.travelSegmentId)[0]
        //     return{
        //         name:data.name,
        //         travelTime:item.travelTime
        //     }
        // }))

        return newTravelTimeRecord.map(item=>{
            const data = travelSegments.filter(item1=>item1.id==item.travelSegmentId)[0]
            return{
                name:data.name,
                travelTime:item.travelTime
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
                    const res1 = await this.googleMap.distancematrix({
                        params:{
                            origins:[{lat:travelSegment['startX'],lng:travelSegment['startY']}],
                            destinations:[{lat:travelSegment['middleX'],lng:travelSegment['middleY']}],
                            key:googleMapApiKey.distanceMatrixService,
                        }
                    })
    
                    const res2 = await this.googleMap.distancematrix({
                        params:{
                            origins:[{lat:travelSegment['middleX'],lng:travelSegment['middleY']}],
                            destinations:[{lat:travelSegment['endX'],lng:travelSegment['endY']}],
                            key:googleMapApiKey.distanceMatrixService,
                        }
                    })
                    travelTime = res1.data.rows[0].elements[0]['duration']['value']+res2.data.rows[0].elements[0]['duration']['value']
                }
                else{
                const res = await this.googleMap.distancematrix({
                    params:{
                        origins:[{lat:travelSegment['startX'],lng:travelSegment['startY']}],
                        destinations:[{lat:travelSegment['endX'],lng:travelSegment['endY']}],
                        key:googleMapApiKey.distanceMatrixService,
                    }
                })
                travelTime = res.data.rows[0].elements[0]['duration']['value']
                }
                await this.repository.updateTravelSegment({where:{id:travelSegment.id},data:{travelTime:travelTime}})
        }

        const newResult = await this.repository.getTravelSegment()
        return newResult.map(item=>({name:item.name,travelTime:item.travelTime}))


    }

    
}