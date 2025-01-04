'use client'

import { Box } from "@mui/material";
import { MyButton,MyText } from "../MyInput";
import { useState } from "react";

export function AddForm({title,notNull}:any){
    const [state,setState] = useState<Record<string,string>>({})
    const notNullHasData = notNull.map((item:string)=>{
        return Boolean(state[item])
    }).filter((item:boolean)=>item).length==notNull.length
    // console.log(notNull)    
    return <Box sx={{padding:'15px'}}>
    {Object.keys(title).map((key:string)=>{
        const item = title[key]
        return <Box sx={{
            marginBottom:'10px',
            display:'flex',
            justifyContent:'space-between'
            }}><Box>{item}：
            </Box>
        <MyText notNull={notNull.includes(key)} type="text" onChange={(e)=>{
            setState((prevData)=>{
                // console.log({...prevData,[key]:e.target.value})
                return {...prevData,[key]:e.target.value}
            })
        }
            } 
            value={state[key]??''}
            />
        </Box>
    })}
<Box sx={{display:'flex',justifyContent:'start'}}>
    <MyButton style={{color:notNullHasData?'black':'gray'}} onClick={()=>{
        if(notNullHasData){

        }
        return
    }} >新增</MyButton>
    </Box>
    </Box>
}
