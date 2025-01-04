'use client'
import StreamView from "@/components/StreamView"
import ItemPicker from "@/components/ItemPicker"
import { Box,Grid } from "@mui/material"
import { ItemPickerContext } from "@/contexts/ItemPickerContext"
import { useContext } from "react"

export default function LiveVideo(){
    const {itemLength} = useContext(ItemPickerContext)
    return <Box sx={{display:'flex',width:'100%',height:'100%'}}>
    <ItemPicker itemKey="location" title='路口選擇' path="cctv" />
    <Grid spacing={1} container>
        {Array.from({ length: itemLength }, (_, index) => {
            return <Grid item xs={12/Math.sqrt(itemLength)}><StreamView id={index}  /></Grid>
        })}
    </Grid>
    {/* <StreamView id={1}  /> */}
    </Box>
}