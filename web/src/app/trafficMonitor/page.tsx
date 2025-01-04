'use client'
import Panel from "./panel"
import ItemPicker from "@/components/ItemPicker"
import { Box,Grid } from "@mui/material"
import { ItemPickerContext } from "@/contexts/ItemPickerContext"
import { useContext } from "react"

export default function TrafficMonitor(){
    const {itemLength} = useContext(ItemPickerContext)
    
    return <Box sx={{display:'flex',width:'100%',height:'100%'}}>
        <ItemPicker itemKey="location" title='路口選擇' path="vd/road" />
        <Grid spacing={1} container>
            {Array.from({length:itemLength},(_,index)=>{
                return <Grid item xs={12/Math.sqrt(itemLength)}>
                    <Panel parentHeight={300} parentWidth={600} />
                    </Grid>
            })}
            </Grid>
    </Box>
}