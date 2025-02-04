'use client'
import useApi from "@/hooks/useApi";
import { ManualTable } from "@/components/Table/manualTable"
import { useEffect, useState,useContext } from "react";

import Wrapper from "@/components/Wrapper";
import MyDialog from "@/components/MyDialog";
import { DialogContext } from "@/contexts/DialogContext";
import {Add} from '@mui/icons-material';
import { MyText,MySelect, MyButton } from "@/components/MyInput";
import MyBox from "@/components/MyBox";
import { IconButton } from "@mui/material";


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
  const [deleteId,setDeleteId] = useState(0)
  const [editValue,setEditValue] = useState({})
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
  const [tableData,setTableData] = useState([])
  const [groupData,setGroupData] = useState([])
    useEffect(()=>{
      setLoading(true)
      post('travelTime/normal').then((data)=>{
        setTableData(data)
        post('travelTime/group').then((data2)=>{
          const updateGroupData:any = []
          data2.map((item:any)=>{       
                 
            let groupTravelTime = 0
            for(const segmentId of item['segments'].split(',')){
              const id = Number(segmentId)==0?1:Number(segmentId)
              groupTravelTime+= data.find((item1:any)=>item1.id==id)['travelTime']
            }
            updateGroupData.push({name:item.name,travelTime:groupTravelTime,segments:item['segments'].split(','),id:item.id})
          })
          setGroupData(updateGroupData)
          setLoading(false)
        })
        
    })

    },[])
    
    // return <><ManualTable data={sampleData} title={{id:'編號',name:'名稱'}} filterValues={{}} /></>
    
    return <Wrapper isLoading={isLoading}>
      
      <ManualTable addFunction={()=>{
        openDialog(addTravelTimeKey)
      }}

      editFunction={(item:any)=>{
        setEditValue(item)
        openDialog(editTravelTimeKey)
      }}

      deleteFunction={(item:any)=>{
        setDeleteId(item.id)
        openDialog(deleteTravelTimeKey)
      }}
      
      form={true} data={
        groupData.map(item=>({
      name:item['name'],travelTime:formatDuration(item['travelTime']),id:item['id'],segments:item['segments']
    }))} title={title} hide={['id','segments']} />

      {/* <ManualTable data={tableData.map(item=>({
      name:item['name'],travelTime:formatDuration(item['travelTime'])
    }))} title={title} /> */}

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

function AddComponent({data}:any){
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
            return <>點位{index+1}:<MySelect labels={data.map((item:any)=>item.name)} ids={data.map((item:any)=>item.id)} state={String(state.segments[index])} setState={(data)=>{
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

function EditComponent({editValue,data}:any){
  const {post} = useApi()
  const [state,setState] = useState<any>(editValue)
  const [amount,setAmount] = useState<any>(editValue?.segments?.length)
  console.log(editValue)
  return <MyBox sx={{padding:'10px',display:'flex',flexDirection:'column',gap:'10px',alignItems:'center'}}>
    群組名稱：<MyText value={state['name']} onChange={(e)=>{
      setState((prevData:any)=>{
        return {...prevData,name:e.target.value}
      })
    }}/>
    {Array.from({ length: amount }, (_, index) => {
            return <>點位{index+1}:<MySelect labels={data.map((item:any)=>item.name)} ids={data.map((item:any)=>item.id)} state={String(state.segments[index])} setState={(data)=>{
              setState((prevData:any)=>{
                const updatedSegments = [...prevData.segments]
                updatedSegments[index] = Number(data)
                return {...prevData,segments:updatedSegments}
              })
            }}   /></>
        })}
        <IconButton onClick={()=>{
          setAmount((prevData:any)=>{
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

function DeleteComponent({deleteId}:any){
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

