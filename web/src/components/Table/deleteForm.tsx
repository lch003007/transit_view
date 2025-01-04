'use client'

import { Box } from "@mui/material";
import { MyButton,MyText } from "../MyInput";

export function DeleteForm({title,defaultData}:any){
    return <Box sx={{padding:'15px'}}>
    {Object.keys(title).map((key:string)=>{
        const item = title[key]
        return <Box sx={{
            marginBottom:'10px',
            display:'flex',
            justifyContent:'space-between'
            }}><Box>{item}：
            </Box>
        <MyText disabled type="text" 
            value={defaultData[key]??''}
            />
        </Box>
    })}
<Box sx={{display:'flex',justifyContent:'space-between'}}>

    <MyButton onClick={()=>{

    }} >確定刪除</MyButton>
    <MyButton onClick={()=>{

}} >取消</MyButton>
    </Box>
    </Box>
}
