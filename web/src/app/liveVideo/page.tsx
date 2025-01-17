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
export default function LiveVideo(){
    const {post} = useApi()
    const [state,setState] = useState([{}])
    const {isLoading,setLoading} = useContext(LoadingContext)
    const {itemLength} = useContext(ItemPickerContext)
    useEffect(()=>{
        setLoading(true)
        post('cctv').then(function(data){
            setState(data)
            setLoading(false)
        })
    },[])
    
    return <Wrapper isLoading={isLoading}><Box sx={{display:'flex',width:'100%',height:'100%'}}>
    <ItemPicker itemKey="location" title='路口選擇' itemOptions={state} />
    <Grid spacing={1} container>
        {Array.from({ length: itemLength }, (_, index) => {
            return <Grid item xs={12/Math.sqrt(itemLength)}><StreamView id={index}  /></Grid>
        })}
    </Grid>
    {/* <StreamView id={1}  /> */}
    </Box>
    </Wrapper>
}