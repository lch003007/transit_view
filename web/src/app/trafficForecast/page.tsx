'use client'

import { DbTable } from "@/components/Table/dbTable";

export default function TrafficForecast(){

    // return <><ManualTable data={sampleData} title={{id:'編號',name:'名稱'}} filterValues={{}} /></>
    // return <Wrapper isLoading={isLoading}><ManualTable data={[
    //   {
    //     name:'蘇花路廊',
    //     volumeNow:'NaN',
    //     volume1:'NaN',
    //     volume3:'NaN',
    //     volume6:'NaN',
    //   }
    // ]}  title={
    //   {
    //     name:'路段',
    //     volumeNow:'現在車流量',
    //     volume1:'1小時後',
    //     volume3:'3小時後',
    //     volume6:'6小時後',
    // }} />
    // </Wrapper>
    return <DbTable config={{date:new Date()}} title={{
      road:'路段',
      direction:'方向',
      currentVolume:'車流量',
      predict1Hour:'1小時後',
      predict3Hour:'3小時後',
      predict6Hour:'6小時後',
    }} path="travelTime/volume/predict" />
  }