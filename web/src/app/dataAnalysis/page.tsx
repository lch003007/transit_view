'use client'
import { MyDatePicker } from "@/components/MyInput"
import { useEffect, useState } from "react"
import dayjs, { Dayjs } from 'dayjs';
import { Box,Grid } from "@mui/material";
import ItemPicker from "@/components/ItemPicker";
import { useContext } from "react";
import { ItemPickerContext } from "@/contexts/ItemPickerContext";
import VdChart from "./vdChart";
import Wrapper from "@/components/Wrapper";
import { LoadingContext } from "@/contexts/Loading";
import useApi from "@/hooks/useApi";
import EditGroup from "@/components/ItemPicker/editGroup"
import DeleteGroup from "@/components/ItemPicker/deleteGroup"
import { DialogContext } from "@/contexts/DialogContext"
import GroupBar from "@/components/ItemPicker/groupBar";
import MyDialog from "@/components/MyDialog";
import { useSort } from "@/hooks/useSort";
import AddGroup from "@/components/ItemPicker/addGroup";

interface GroupData{
    id:number,
    name:string,
    roadIds:string,
    itemLength:number
}

export default function DataAnalysis(){
    const {sortRoad} = useSort()
    const {itemLength,group} = useContext(ItemPickerContext)
    const [groupData,setGroupData] = useState<GroupData[]>([])
    const {openDialog,keys} = useContext(DialogContext)
    const [editGroupName,setEditGroupName] = useState("")
    const {panelGroupKey,panelDeleteKey,panelGroupSaveAsKey} = keys
    const {post} = useApi()
    const [state,setState] = useState([{}])
    const {isLoading,setLoading} = useContext(LoadingContext)
    const [endDate,setEndDate] = useState<Dayjs>(dayjs())

    useEffect(()=>{
        setLoading(true)
        post('vd/road').then(function(data){
            setState(sortRoad(data))
            setLoading(false)
        })
        post('vd/panelGroup').then(function(data){
            setGroupData(data)
        })
    },[])

    return <Wrapper isLoading={isLoading}><Box sx={{display:'flex',width:'100%',height:'100%'}}>
        <ItemPicker idKey="roadIds" itemGroups={groupData} groupItemKey="name" itemKey="location" title='路口選擇' itemOptions={state} />
        <Box sx={{width:'100%',height:'100%'}}>
            <Box sx={{display:'flex',background:'white',padding:'10px',borderRadius: '5px',width:'100%',
                boxShadow: '3px 4px 6px rgba(0, 0, 0, 0.3)',justifyContent:'space-around'}}>
        {/* <MyDatePicker label={'開始時間：'} ltDate={endDate} date={beginDate}  setDate={setBeginDate} /> */}
        <MyDatePicker label={'結束時間：'} ltDate={'now'} date={endDate}  setDate={setEndDate} />
        </Box>
        <Grid spacing={1} container sx={{height:'90%',marginTop:'10px'}}>
            {Array.from({length:itemLength},(_,index)=>{
                return <Grid key={`grid${index}`} item xs={12/Math.sqrt(itemLength)} sx={{height:`${100/Math.sqrt(itemLength)}%`}}>
                    <VdChart id={index} endDate={endDate} />
                    </Grid>
            })}
            </Grid>

        </Box>
        <GroupBar remove={()=>{
                openDialog(panelDeleteKey)
            }} saveAs={()=>{
                openDialog(panelGroupSaveAsKey)
            }} save={()=>{
                if(group==0)
                {
                    openDialog(panelGroupSaveAsKey)
                }else{
                    openDialog(panelGroupKey)
                    const editGroupName = groupData.find((item:GroupData)=>item.id==group)?.name
                    setEditGroupName(editGroupName?editGroupName:'')
                }
            }}/>
        </Box>
        <MyDialog openKey={panelGroupKey}>
        <EditGroup idKey={'roadIds'} path='vd/panelGroup/update' data={editGroupName} />
    </MyDialog>

    <MyDialog openKey={panelGroupSaveAsKey}>
        <AddGroup idKey={'roadIds'} path='vd/panelGroup/insert' />
    </MyDialog>

    <MyDialog openKey={panelDeleteKey}>
        <DeleteGroup path='vd/panelGroup/delete' />
    </MyDialog>
        </Wrapper>
}
