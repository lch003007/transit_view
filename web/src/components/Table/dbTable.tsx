'use client'
import { useState,useEffect } from "react";
import { ManualTable } from "./manualTable";
import useApi from "@/hooks/useApi";
import Wrapper from "../Wrapper";

export function DbTable({path,config={},title={},filterValues={},totalFilter=false,form=false,notNull=[],hide=[],numberData=[],booleanData=[]}:{path:string,config?:any,title?:any,filterValues?:any,totalFilter?:boolean,form?:boolean,notNull?:string[],hide?:string[],numberData?:string[],booleanData?:string[]}){
    const [data,setData] = useState([])
    const [isLoading,setLoading] = useState(false)
    const {post} = useApi()
    useEffect(()=>{
        setLoading(true)
        post(path,config).then(res=>{
            setData(res)
            setLoading(false)
        })
    },[])

    return <Wrapper isLoading={isLoading}><ManualTable data={data} title={title} filterValues={filterValues} totalFilter={totalFilter} form={form} notNull={notNull} hide={hide} path={path} numberData={numberData} booleanData={booleanData} />
</Wrapper>
}