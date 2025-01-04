'use client'
import { ManualTable } from "@/components/Table/manualTable"
import { DbTable } from "@/components/Table/dbTable";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";

function formatDuration(seconds: number): string {
  if (seconds <= 0) return "0秒";

  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= 24 * 60 * 60;

  const hours = Math.floor(seconds / (60 * 60));
  seconds %= 60 * 60;

  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  const parts: string[] = [];

  if (days > 0) parts.push(`${days}天`);
  if (hours > 0) parts.push(`${hours}小時`);
  if (minutes > 0) parts.push(`${minutes}分鐘`);
  if (seconds > 0) parts.push(`${seconds}秒`);

  return parts.join(" ");
}

export default function TravelTimeForecast(){
    const {post} = useApi()
  const [tableData,setTableData] = useState([])
    useEffect(()=>{
      post('travelTime/predict').then((data)=>{
        setTableData(data)
    })
    },[])

    // return <><ManualTable data={sampleData} title={{id:'編號',name:'名稱'}} filterValues={{}} /></>
    return <><ManualTable data={tableData.map(item=>{
      const name = item['name']
      const travelTime = formatDuration(item['travelTime'])
      return {
        name:name,
        travelTime:travelTime,
        travelTime5:travelTime,
        travelTime15:travelTime,
        travelTime30:travelTime,
        travelTime60:travelTime,
      }
    })}  title={
      {
      name:'路段',
      travelTime:'旅行時間',
      travelTime5:'5分鐘後',
      travelTime15:'15分鐘後',
      travelTime30:'30分鐘後',
      travelTime60:'60分鐘後',
    }} /></>
  }