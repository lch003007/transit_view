'use client'
import Panel from "./panel"
import ItemPicker from "@/components/ItemPicker"
import { Box,Grid } from "@mui/material"
import { ItemPickerContext } from "@/contexts/ItemPickerContext"
import { useContext, useEffect, useState } from "react"
import { LoadingContext } from "@/contexts/Loading"
import useApi from "@/hooks/useApi"
import Wrapper from "@/components/Wrapper"
import GroupBar from "@/components/ItemPicker/groupBar"
import MyDialog from "@/components/MyDialog"
import { DialogContext } from "@/contexts/DialogContext"
import EditGroup from "@/components/ItemPicker/editGroup"
import DeleteGroup from "@/components/ItemPicker/deleteGroup"
import { useSort } from "@/hooks/useSort"
import AddGroup from "@/components/ItemPicker/addGroup"

interface GroupData{
    id:number,
    name:string,
    cctvIds:string,
    itemLength:number
}

export default function TrafficMonitor(){
    const {sortRoad} = useSort()
    const [groupData,setGroupData] = useState<GroupData[]>([])
    const {itemLength,group} = useContext(ItemPickerContext)
    const {openDialog,keys} = useContext(DialogContext)
    const [editGroupName,setEditGroupName] = useState("")
    const {panelGroupKey,panelDeleteKey,panelGroupSaveAsKey} = keys
    const {post} = useApi()
    const [state,setState] = useState([{}])
    const {isLoading,setLoading} = useContext(LoadingContext)
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

    return <Wrapper isLoading={isLoading}>
        <Box sx={{display:'flex',width:'100%',height:'100%'}}>
        <ItemPicker idKey="roadIds" itemGroups={groupData} groupItemKey="name" itemKey="location" title='路口選擇' itemOptions={state} />
        <Grid spacing={1} container>
            {Array.from({length:itemLength},(_,index)=>{
                return <Grid key={`trafficMonitorGrid${index}`} item xs={12/Math.sqrt(itemLength)} sx={{height:`${100/Math.sqrt(itemLength)}%`}}>
                    <Panel id={index} />
                    </Grid>
            })}
            </Grid>
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
                    setEditGroupName(groupData.find((item:GroupData)=>item.id==group)?.name||"")
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

