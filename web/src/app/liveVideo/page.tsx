'use client'
import StreamView from "./streamView"
import ItemPicker from "@/components/ItemPicker"
import { Box,Grid } from "@mui/material"
import { ItemPickerContext } from "@/contexts/ItemPickerContext"
import { useContext, useEffect, useState } from "react"
import { LoadingContext } from "@/contexts/Loading"
import Loading from "../loading"
import useApi from "@/hooks/useApi"
import Wrapper from "@/components/Wrapper"
import { DialogContext } from "@/contexts/DialogContext"
import GroupBar from "@/components/ItemPicker/groupBar"
import MyDialog from "@/components/MyDialog"
import EditGroup from "@/components/ItemPicker/editGroup"
import DeleteGroup from "@/components/ItemPicker/deleteGroup"
import { useSort } from "@/hooks/useSort"

interface GroupData{
    id:number,
    name:string,
    cctvIds:string,
    itemLength:number
}

export default function LiveVideo(){
    const {sortRoad} = useSort()
    const [groupData,setGroupData] = useState<GroupData[]>([])
    const {post} = useApi()
    const [state,setState] = useState([{}])
    const {isLoading,setLoading} = useContext(LoadingContext)
    const {itemLength,itemsSelected,group} = useContext(ItemPickerContext)
    const {openDialog,keys} = useContext(DialogContext)
    const {panelGroupKey,panelDeleteKey} = keys
    const [editGroupName,setEditGroupName] = useState("")
    useEffect(()=>{
        setLoading(true)
        post('cctv').then(function(data){
            setState(sortRoad(data))
            setLoading(false)
        })
        post('cctv/group').then(function(data){
            setGroupData(data)
        })
    },[])

    const saveAs = ()=>{
        const cctvIds:number[] = []
        Array.from({length:itemLength},(_,index)=>{
            if(itemsSelected[index])
                cctvIds.push(itemsSelected[index]['id'])
            else
            cctvIds.push(0)
        })
        post('cctv/group/insert',{
            itemLength:itemLength,
            cctvIds:cctvIds.join(',')
        })
        window.location.reload()
    }
    
    return <Wrapper isLoading={isLoading}><Box sx={{display:'flex',width:'100%',height:'100%'}}>
    <ItemPicker idKey="cctvIds" itemGroups={groupData} groupItemKey="name" itemKey="location" title='路口選擇' itemOptions={state} />
    <Grid spacing={1} container>
        {Array.from({ length: itemLength }, (_, index) => {
            return <Grid item xs={12/Math.sqrt(itemLength)}><StreamView id={index}  /></Grid>
        })}
    </Grid>
    {/* <StreamView id={1}  /> */}
    <GroupBar remove={()=>{
                openDialog(panelDeleteKey)
            }} saveAs={saveAs} save={()=>{
                if(group==0)
                {
                    saveAs()
                }else{
                    openDialog(panelGroupKey)
                    setEditGroupName(groupData.find((item:GroupData)=>item.id==group)?.name ||"")
                }
            }}/>
    </Box>
    <MyDialog openKey={panelGroupKey}>
        <EditGroup idKey={'cctvIds'} path='cctv/group/update' data={editGroupName} />
    </MyDialog>
    <MyDialog openKey={panelDeleteKey}>
        <DeleteGroup path='cctv/group/delete' />
    </MyDialog>
    </Wrapper>
}