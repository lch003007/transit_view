'use client'
import { DbTable } from "@/components/Table/dbTable"
import {TextField,Box} from "@mui/material";
import { useState } from "react";

export default function RoadEvents(){
    const [keyword,setKeyword] = useState('')
    const title = {
        id:'編號',
        roadtype:'類別',
        areaNm:'地點',
        comment:'路況說明',
        eventTime:'時間',
        srcdetail:'消息來源'
    }

    return <Box>
        
        <DbTable path='trafficStatus' title={title} totalFilter={true} />
        </Box>
}