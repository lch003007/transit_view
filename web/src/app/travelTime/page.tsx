'use client'
import useApi from "@/hooks/useApi";
import { ManualTable } from "@/components/Table/manualTable"
import { DbTable } from "@/components/Table/dbTable";
import { useEffect, useState,useContext } from "react";
import Loading from "../loading";
import { LoadingContext } from "@/contexts/Loading";

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

export default function TravelTime(){
  const {post} = useApi()
  const {isLoading} = useContext(LoadingContext)
  const title = {
    name:'路段',
    travelTime:'旅行時間'
  }
  const [tableData,setTableData] = useState([])
    useEffect(()=>{
      post('travelTime/normal').then((data)=>{
        setTableData(data)
        
    })
    },[])
    
    // return <><ManualTable data={sampleData} title={{id:'編號',name:'名稱'}} filterValues={{}} /></>
    
    return isLoading?<Loading/>:<><ManualTable data={tableData.map(item=>({
      name:item['name'],travelTime:formatDuration(item['travelTime'])
    }))} title={title} /></>
  }