'use client'
import { MyDatePicker } from "@/components/MyInput"
import { useEffect, useState } from "react"
import dayjs from 'dayjs';
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

export default function DataAnalysis(){
    const {sortRoad} = useSort()
    const {itemLength,itemsSelected,group} = useContext(ItemPickerContext)
    const [groupData,setGroupData] = useState<any>([])
    const {openDialog,closeDialog,keys} = useContext(DialogContext)
    const [editGroupName,setEditGroupName] = useState("")
    const {panelGroupKey,panelDeleteKey} = keys
    const {post} = useApi()
    const [state,setState] = useState([{}])
    const {isLoading,setLoading} = useContext(LoadingContext)
    const [endDate,setEndDate] = useState(dayjs())

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

    const saveAs = ()=>{
        const roadIds:any = []
        Array.from({length:itemLength},(_,index)=>{
            if(itemsSelected[index])
                roadIds.push(itemsSelected[index]['id'])
            else
            roadIds.push(0)
        })
        post('vd/panelGroup/insert',{
            itemLength:itemLength,
            roadIds:roadIds.join(',')
        })
        window.location.reload()
    }

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
                return <Grid item xs={12/Math.sqrt(itemLength)} sx={{height:`${100/Math.sqrt(itemLength)}%`}}>
                    <VdChart id={index} endDate={endDate} />
                    </Grid>
            })}
            </Grid>

        </Box>
        <GroupBar remove={()=>{
                openDialog(panelDeleteKey)
            }} saveAs={saveAs} save={()=>{
                if(group==0)
                {
                    saveAs()
                }else{
                    openDialog(panelGroupKey)
                    setEditGroupName(groupData.find((item:any)=>item.id==group).name)
                }
            }}/>
        </Box>
        <MyDialog openKey={panelGroupKey}>
        <EditGroup idKey={'roadIds'} path='vd/panelGroup/update' data={editGroupName} itemsSelected={itemsSelected} />
    </MyDialog>
    <MyDialog openKey={panelDeleteKey}>
        <DeleteGroup path='vd/panelGroup/delete' />
    </MyDialog>
        </Wrapper>
}
