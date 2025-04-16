'use client'
import {Box} from "@mui/material";
import { FeatureTable } from "@/components/Table/featureTable";
export default function RoadEvents(){
    const title = {
        id:'編號',
        roadtype:'類別',
        areaNm:'地點',
        comment:'路況說明',
        eventTime:'時間',
        srcdetail:'消息來源'
    }

    return <Box>
        <FeatureTable config={{
            where:{
                eventTime:{
                    gte:new Date(new Date().setHours(0, 0, 0, 0))
                },
                srcdetail:{
                    contains:'公路局東區養護工程分局'
                }
            }
        }} path='trafficStatus' title={title} totalFilter={true}
        api={true}
        />
        </Box>
}