'use client'
import Panel from "./panel"
import ItemPicker from "@/components/ItemPicker"
import { Box,Grid } from "@mui/material"
import { ItemPickerContext } from "@/contexts/ItemPickerContext"
import { useContext, useEffect, useState } from "react"
import { LoadingContext } from "@/contexts/Loading"
import useApi from "@/hooks/useApi"
import Loading from "../loading"
import Wrapper from "@/components/Wrapper"

export default function TrafficMonitor(){
    const {itemLength} = useContext(ItemPickerContext)
    const {post} = useApi()
    const [state,setState] = useState([{}])
    const {isLoading,setLoading} = useContext(LoadingContext)
    useEffect(()=>{
        setLoading(true)
        post('vd/road').then(function(data){
            setState(data)
            setLoading(false)
        })
    },[])

    return <Wrapper isLoading={isLoading}><Box sx={{display:'flex',width:'100%',height:'100%'}}>
        <ItemPicker itemKey="location" title='路口選擇' itemOptions={state} />
        <Grid spacing={1} container>
            {Array.from({length:itemLength},(_,index)=>{
                return <Grid item xs={12/Math.sqrt(itemLength)} sx={{height:`${100/Math.sqrt(itemLength)}%`}}>
                    <Panel />
                    </Grid>
            })}
            </Grid>
    </Box>
    </Wrapper>
}
