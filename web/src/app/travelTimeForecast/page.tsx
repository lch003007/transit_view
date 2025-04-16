'use client'
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import Wrapper from "@/components/Wrapper";
import { FeatureTable } from "@/components/Table/featureTable";

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
  // const [tableData,setTableData] = useState([])
  const [groupData,setGroupData] = useState<Record<string,string>[]>([])
  const [isLoading,setLoading] = useState(false)
    useEffect(()=>{
      setLoading(true)
      post('travelTime/predict').then((data)=>{
        post('travelTime/group').then((data2)=>{
          const updateGroupData:Record<string,string>[] = []
          data2.map((item:Record<string,string|number>)=>{       
            const groupTravelTime = [0,0,0,0,0]
            for(const segmentId of String(item['segments']).split(',')){
              const id = Number(segmentId)==0?1:Number(segmentId)
              Array.from({length:5},(_,index)=>{
                if(index==0){
                  groupTravelTime[index]+= data.find((item1:Record<string,string|number>)=>item1.travelSegmentId==id)['travelTime']
                }else{
                  groupTravelTime[index]+= data.find((item1:Record<string,string|number>)=>item1.travelSegmentId==id)[`travelTimePredict${index}`]
                }
                
            })
              
            }
            // console.log(456)
            updateGroupData.push({
              name:String(item.name),
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
      <FeatureTable data={groupData}  title={title}  />
      {/* <ManualTable data={tableData}  title={title} /> */}
      </Wrapper>
  }