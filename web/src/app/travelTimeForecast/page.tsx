'use client'
import { ManualTable } from "@/components/Table/manualTable"
import { DbTable } from "@/components/Table/dbTable";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import Wrapper from "@/components/Wrapper";

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
  const title = {
    name:'路段',
    travelTime:'旅行時間',
    travelTimePredict1:'5分鐘後',
    travelTimePredict2:'15分鐘後',
    travelTimePredict3:'30分鐘後',
    travelTimePredict4:'60分鐘後',
  }
    const {post} = useApi()
  const [tableData,setTableData] = useState([])
  const [groupData,setGroupData] = useState([])
  const [isLoading,setLoading] = useState(false)
    useEffect(()=>{
      setLoading(true)
      post('travelTime/predict').then((data)=>{
        setTableData(data.map((item:any)=>{
          return {
            name:item.name,
            travelTime:formatDuration(item['travelTime']),
            travelTimePredict1:formatDuration(item['travelTimePredict1']),
            travelTimePredict2:formatDuration(item['travelTimePredict2']),
            travelTimePredict3:formatDuration(item['travelTimePredict3']),
            travelTimePredict4:formatDuration(item['travelTimePredict4']),
          }
        }))
        post('travelTime/group').then((data2)=>{
          const updateGroupData:any = []
          data2.map((item:any)=>{       
            let groupTravelTime = [0,0,0,0,0]
            console.log(123)
            console.log(item['segments'].split(','))
            for(const segmentId of item['segments'].split(',')){
              const id = Number(segmentId)==0?1:Number(segmentId)
              Array.from({length:5},(_,index)=>{
                if(index==0){
                  groupTravelTime[index]+= data.find((item1:any)=>item1.travelSegmentId==id)['travelTime']
                }else{
                  groupTravelTime[index]+= data.find((item1:any)=>item1.travelSegmentId==id)[`travelTimePredict${index}`]
                }
                
            })
              
            }
            console.log(456)
            updateGroupData.push({
              name:item.name,
              travelTime:formatDuration(groupTravelTime[0]),
              travelTimePredict1:formatDuration(groupTravelTime[1]),
              travelTimePredict2:formatDuration(groupTravelTime[2]),
              travelTimePredict3:formatDuration(groupTravelTime[3]),
              travelTimePredict4:formatDuration(groupTravelTime[4]),
            })
          })
          setGroupData(updateGroupData)
          setLoading(false)
        })

        setLoading(false)
    })
    },[])

    // return <><ManualTable data={sampleData} title={{id:'編號',name:'名稱'}} filterValues={{}} /></>
    return <Wrapper isLoading={isLoading}>
      <ManualTable data={groupData}  title={title} />
      {/* <ManualTable data={tableData}  title={title} /> */}
      </Wrapper>
  }