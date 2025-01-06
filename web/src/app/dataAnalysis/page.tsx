'use client'
import { MyDatePicker } from "@/components/MyInput"
import { useState } from "react"
import dayjs from 'dayjs';
import { Box,Grid } from "@mui/material";
import ItemPicker from "@/components/ItemPicker";
import { useContext } from "react";
import { ItemPickerContext } from "@/contexts/ItemPickerContext";
import VdChart from "./vdChart";
export default function DataAnalysis(){
    const {itemLength} = useContext(ItemPickerContext)
    // const [beginDate,setBeginDate] = useState(dayjs().subtract(15,'minutes'))
    const [endDate,setEndDate] = useState(dayjs())

    return <Box sx={{display:'flex',width:'100%',height:'100%'}}>
        <ItemPicker itemKey="location" title='路口選擇' path="vd/road" />
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
        </Box>
}
