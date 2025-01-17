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
export default function DataAnalysis(){
    const {itemLength} = useContext(ItemPickerContext)
    const {post} = useApi()
    const [state,setState] = useState([{}])
    // const [beginDate,setBeginDate] = useState(dayjs().subtract(15,'minutes'))
    const {isLoading,setLoading} = useContext(LoadingContext)
    const [endDate,setEndDate] = useState(dayjs())

    useEffect(()=>{
        setLoading(true)
        post('vd/road').then(function(data){
            setState(data)
            setLoading(false)
        })
    },[])

    return <Wrapper isLoading={isLoading}><Box sx={{display:'flex',width:'100%',height:'100%'}}>
        <ItemPicker itemKey="location" title='路口選擇' itemOptions={state} />
        <Box sx={{width:'100%',height:'100%'}}>
            <Box sx={{display:'flex',background:'white',padding:'10px',borderRadius: '5px',width:'100%',
                boxShadow: '3px 4px 6px rgba(0, 0, 0, 0.3)',justifyContent:'space-around'}}>
        {/* <MyDatePicker label={'開始時間：'} ltDate={endDate} date={beginDate}  setDate={setBeginDate} /> */}
        <MyDatePicker label={'結束時間：'} ltDate={'now'} date={endDate}  setDate={setEndDate} />
        </Box>
        <Grid spacing={1} container sx={{height:'90%',marginTop:'10px'}}>
            {Array.from({length:itemLength},(_,index)=>{
                return <Grid item xs={12/Math.sqrt(itemLength)} sx={{height:`${100/Math.sqrt(itemLength)}%`}}>
                    <VdChart endDate={endDate} />
                    </Grid>
            })}
            </Grid>
        </Box>
        </Box></Wrapper>
}
