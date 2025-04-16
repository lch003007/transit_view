'use client'
import useApi from "@/hooks/useApi";
import { useEffect, useState,useContext } from "react";

import Wrapper from "@/components/Wrapper";
import MyDialog from "@/components/MyDialog";
import { DialogContext } from "@/contexts/DialogContext";
import {Add} from '@mui/icons-material';
import { MyText,MySelect, MyButton } from "@/components/MyInput";
import MyBox from "@/components/MyBox";
import { IconButton } from "@mui/material";
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

interface TravelTime{
  id:number,
  name:string,
  travelTime:number
}

interface TravelGroup{
  id:number,
  name:string,
  segments:string
}

interface TravelTable{
  id:number,
  name:string,
  segments:string[],
  travelTime:number
}

interface TravelEdit{
  id:number,
  name:string,
  segments:string[],
  travelTime:string
}

export default function TravelTime(){
  const [deleteId,setDeleteId] = useState(0)
  const [editValue,setEditValue] = useState<TravelEdit>({id:0,name:'',segments:[],travelTime:''})
  const {keys,openDialog} = useContext(DialogContext)
  const {addTravelTimeKey,editTravelTimeKey,deleteTravelTimeKey} = keys
  const {post} = useApi()
  const [isLoading,setLoading] = useState(false)

  const title = {
    name:'路段',
    travelTime:'旅行時間',
    id:'id',
    segments:'segments'
  }
  const [tableData,setTableData] = useState<TravelTime[]>([])
  const [groupData,setGroupData] = useState<TravelTable[]>([])
    useEffect(()=>{
      setLoading(true)
      post('travelTime/normal').then((data)=>{
        setTableData(data)
        post('travelTime/group').then((data2)=>{
          const updateGroupData:TravelTable[] = []
          data2.map((item:TravelGroup)=>{       
            
            let groupTravelTime = 0
            for(const segmentId of item['segments'].split(',')){
              const id = Number(segmentId)==0?1:Number(segmentId)
              groupTravelTime+= data.find((item1:TravelTime)=>item1.id==id)['travelTime']
            }
            updateGroupData.push({name:item.name,travelTime:groupTravelTime,segments:item['segments'].split(','),id:item.id})
          })
          setGroupData(updateGroupData)
          setLoading(false)
        })
        
    })

    },[])
    
    return <Wrapper isLoading={isLoading}>
      
      <FeatureTable addFunction={()=>{
        openDialog(addTravelTimeKey)
      }}

      editFunction={(item:Record<string,string|number|string[]>)=>{
        setEditValue({
          id:Number(item.id),
          name:String(item.name),
          segments:Array.isArray(item.segments)?item.segments:[],
          travelTime:String(item.travelTime)
        })
        openDialog(editTravelTimeKey)
      }}
    
      deleteFunction={(item:Record<string,string|number|string[]>)=>{
        setDeleteId(Number(item.id))
        openDialog(deleteTravelTimeKey)
      }}
      
      form={true} data={
        groupData.map(item=>({
      name:item['name'],travelTime:formatDuration(item['travelTime']),id:item['id'],segments:item['segments']
    }))} title={title} hide={['id','segments']} />


    <MyDialog openKey={addTravelTimeKey}>
      <AddComponent data={tableData} />
    </MyDialog>
    <MyDialog openKey={editTravelTimeKey}>
    <EditComponent data={tableData} editValue={editValue} />
    </MyDialog>
    <MyDialog openKey={deleteTravelTimeKey}>
    <DeleteComponent deleteId={deleteId} />
    </MyDialog>
    </Wrapper>
  }

function AddComponent({data}:{data:TravelTime[]}){
  const {post} = useApi()
  const [state,setState] = useState({name:'',segments:[1]})
  const [amount,setAmount] = useState(1)
  return <MyBox sx={{padding:'10px',display:'flex',flexDirection:'column',gap:'10px',alignItems:'center'}}>
    群組名稱：<MyText value={state['name']} onChange={(e)=>{
      setState((prevData)=>{
        return {...prevData,name:e.target.value}
      })
    }}/>
    {Array.from({ length: amount }, (_, index) => {
            return <>點位{index+1}:<MySelect labels={data.map((item:TravelTime)=>item.name)} ids={data.map((item:TravelTime)=>String(item.id))} state={String(state.segments[index])} setState={(data)=>{
              setState((prevData)=>{
                const updatedSegments = [...prevData.segments]
                updatedSegments[index] = Number(data)
                return {...prevData,segments:updatedSegments}
              })
            }}   /></>
        })}
        <IconButton onClick={()=>{
          setAmount((prevData)=>{
            return prevData+1
          })
        }}>
          <Add/>
        </IconButton>
        <MyButton style={{width:'100px'}} onClick={()=>{
          const data = {
            name:state.name,
            segments:state['segments'].join(',')
          }
          post('travelTime/group/insert',data)
          window.location.reload()
        }}>確定</MyButton>
  </MyBox>
}

function EditComponent({editValue,data}:{editValue:TravelEdit,data:TravelTime[]}){
  const {post} = useApi()
  const [state,setState] = useState<TravelEdit>(editValue)
  const [amount,setAmount] = useState<number>(editValue?.segments?.length)
  return <MyBox sx={{padding:'10px',display:'flex',flexDirection:'column',gap:'10px',alignItems:'center'}}>
    群組名稱：<MyText value={state['name']} onChange={(e)=>{
      setState((prevData:TravelEdit)=>{
        return {...prevData,name:e.target.value}
      })
    }}/>
    {Array.from({ length: amount }, (_, index) => {
            return <>點位{index+1}:<MySelect labels={data.map((item:TravelTime)=>item.name)} ids={data.map((item:TravelTime)=>String(item.id))} state={String(state.segments[index])} setState={(data)=>{
              setState((prevData:TravelEdit)=>{
                console.log(prevData)
                const updatedSegments = [...prevData.segments]
                updatedSegments[index] = String(data)
                return {...prevData,segments:updatedSegments}
              })
            }}   /></>
        })}
        <IconButton onClick={()=>{
          setAmount((prevData:number)=>{
            return prevData+1
          })
        }}>
          <Add/>
        </IconButton>
        <MyButton style={{width:'100px'}} onClick={()=>{
          const data = {
            where:{
              id:state.id
            },
            data:{
              name:state.name,
              segments:state['segments'].join(',')
            }
          }
          post('travelTime/group/update',data)
          window.location.reload()
        }}>確定</MyButton>
  </MyBox>
}

function DeleteComponent({deleteId}:{deleteId:number}){
  const {post} = useApi()

  return <MyBox sx={{padding:'30px'}}>
    <MyButton
    style={{padding:'10px'}}
    onClick={()=>{
      post('travelTime/group/delete',{where:{id:deleteId}})
      window.location.reload()
    }}
    >確定</MyButton>
  </MyBox>
}

