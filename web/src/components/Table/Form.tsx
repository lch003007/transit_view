'use client'

import { Box } from "@mui/material";
import { MyButton,MyText } from "../MyInput";
import { ReactNode, useContext, useEffect, useState } from "react";
import { DialogContext } from "@/contexts/DialogContext";
import useApi from "@/hooks/useApi";

export function Form({
    title,
    notNull=[],
    defaultData={},
    type,
    buttonText='確定',
    hide=[],
    path,
    numberData=[],
    booleanData=[],
    reload=true,
    callbackFunction=()=>{}
}:{
    title:Record<string,string|ReactNode>,
    notNull?:string[],
    defaultData?:Record<string,string|number|string[]>,
    type:string,
    buttonText?:string,
    hide:string[],
    path:string,
    numberData?:string[],
    booleanData?:string[],
    reload?:boolean,
    callbackFunction?:(state:Record<string,string>)=>void
}){
    console.log(defaultData)
    const {post} = useApi()
    const {closeDialog,keys} = useContext(DialogContext)
    const {addKey,deleteKey,editKey,panelKey} = keys
    const [state,setState] = useState<Record<string,string>>({})
    const notNullHasData = notNull.map((item:string)=>{
        return Boolean(state[item])
    }).filter((item:boolean)=>item).length==notNull.length

    const callback = () => {
        if(reload)
            window.location.reload();
        callbackFunction(state)
    }


    useEffect(()=>{
        if(type!=addKey)
        {
            const stateData:Record<string,string> = {}
            Object.keys(defaultData).map(key=>{
                stateData[key] = String(defaultData[key])
            })
            setState(stateData)
        }
            
    },[defaultData])

    return <Box sx={{padding:'15px'}}>
    {Object.keys(title).map((key:string)=>{
        const item = title[key]
        if(hide.includes(key))
            return  <></>
        return <Box key={`Box${key}`} sx={{
            marginBottom:'10px',
            display:'flex',
            justifyContent:'space-between'
            }}><Box>{item}：
            </Box>
        <MyText disabled={type==deleteKey} notNull={notNull.includes(key)} type="text" onChange={(e)=>{
            setState((prevData)=>{
                return {...prevData,[key]:e.target.value}
            })
        }
            } 
            value={state[key]??''}
            />
        </Box>
    })}
<Box sx={{display:'flex',justifyContent:'space-between'}}>


    <MyButton style={{color:notNullHasData?'black':'gray'}} onClick={()=>{
        if([addKey,editKey,panelKey].includes(type))
        {
            if(notNullHasData){
                if(type==addKey){
                    const insertData: Record<string,string|number|string[]> = {};
                    Object.keys(state).map(key=>{
                        const value = numberData.includes(key)?
                                        Number(state[key]):
                                        booleanData.includes(key)?
                                        Boolean(state[key]):
                                        state[key]
                        insertData[key] = String(value)
                    })
                    post(path,insertData)
                    callback();
                }
                else{
                    const updateData = {
                        where:{id:Number(defaultData['id'])},
                        data: {} as Record<string,string|number|Date>
                }
                Object.keys(state).map(key=>{
                    if(defaultData[key]!=state[key])
                    {
                        const value = numberData.includes(key)?
                        Number(state[key]):
                        booleanData.includes(key)?
                        Boolean(state[key]):
                        state[key]

                        updateData['data'][key] = String(value)
                    }
                        
                })
                    post(path,updateData)
                    callback();
                }
            }else{

            }
        }
        else{
            post(path,{where:{id:Number(defaultData['id'])}})
            callback();
        }

        closeDialog(type)
    }} >{buttonText}</MyButton>

<MyButton style={{color:notNullHasData?'black':'gray'}} onClick={()=>{

    closeDialog(type)

    }} >取消</MyButton>


    </Box>
    </Box>
}
