'use client'

import { FeatureTable } from "@/components/Table/featureTable";
export default function TrafficForecast(){

    return <FeatureTable config={{where:{date:new Date()}}} title={{
      road:'路段',
      direction:'方向',
      currentVolume:'車流量',
      predict1Hour:'1小時後',
      predict3Hour:'3小時後',
      predict6Hour:'6小時後',
    }} path="travelTime/volume/predict" api={true} />
  }