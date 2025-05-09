'use client'
import { ItemPickerContext } from "@/contexts/ItemPickerContext"
import useApi from "@/hooks/useApi"
import { useContext, useState } from "react"
import MyBox from "../MyBox"
import { Box } from "@mui/material"
import { MyButton, MyText } from "../MyInput"

export default function  AddGroup({idKey,path}:{idKey:string,path:string}){
    const {itemLength,itemsSelected} = useContext(ItemPickerContext)
    const {post} = useApi()
    const [state,setState] = useState('新增群組')
    return <MyBox sx={{display:'flex',flexDirection:'column',padding:'15px'}}>
        <Box>群組名稱:<MyText value={state} onChange={(e)=>{
            setState(e.target.value)
        }} /></Box>
        <MyButton style={{width:'100px',marginTop:'10px'}} onClick={()=>{
            post(path,{
                    name:state,
                    itemLength:itemLength,
                    [idKey]:Array.from({length:itemLength},(_,index)=>{
                        if(itemsSelected[index])
                            return itemsSelected[index]['id']
                        else
                            return 0
                    }).join(',')
                
            })
            window.location.reload()
        }}>確定</MyButton>
    </MyBox>
}