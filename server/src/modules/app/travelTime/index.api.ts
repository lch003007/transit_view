import { Injectable, OnModuleInit } from "@nestjs/common";
import { googleMapApiKey } from "src/app.setting";
import { Client } from "@googlemaps/google-maps-services-js";

@Injectable()
export class TravelTimeApi implements OnModuleInit{
    constructor(private googleMap:Client){}
    onModuleInit() {
        this.googleMap = new Client()
    }
    async getTravelTime(travelSegment:any,middlePoint=false,realTime=undefined){
        const travelKey = realTime?'duration_in_traffic':'duration'
        if(middlePoint){
            const res1 = await this.googleMap.distancematrix({
                params:{
                    origins:[{lat:travelSegment['startX'],lng:travelSegment['startY']}],
                    destinations:[{lat:travelSegment['middleX'],lng:travelSegment['middleY']}],
                    key:googleMapApiKey.distanceMatrixService,
                    departure_time:realTime
                }
            })

            const res2 = await this.googleMap.distancematrix({
                params:{
                    origins:[{lat:travelSegment['middleX'],lng:travelSegment['middleY']}],
                    destinations:[{lat:travelSegment['endX'],lng:travelSegment['endY']}],
                    key:googleMapApiKey.distanceMatrixService,
                    departure_time:realTime
                }
            })
            return res1.data.rows[0].elements[0][travelKey]['value']+res2.data.rows[0].elements[0][travelKey]['value']
        }else{
            const res = await this.googleMap.distancematrix({
                params:{
                    origins:[{lat:travelSegment['startX'],lng:travelSegment['startY']}],
                    destinations:[{lat:travelSegment['endX'],lng:travelSegment['endY']}],
                    key:googleMapApiKey.distanceMatrixService,
                    departure_time:realTime
                }
            })
            return res.data.rows[0].elements[0][travelKey]['value']
        }
    }
}