'use client'

import { Box } from "@mui/material";
import { MyButton,MyText } from "../MyInput";
import { useContext, useEffect, useState } from "react";
import { DialogContext } from "@/contexts/DialogContext";
import useApi from "@/hooks/useApi";

export function Form({title,notNull,defaultData=[],type,buttonText='確定',hide=[],path,addKey,editKey,deleteKey,numberData=[],booleanData=[]}:any){
    const {post} = useApi()
    const {closeDialog} = useContext(DialogContext)
    const [state,setState] = useState<Record<string,string>>({})
    const notNullHasData = notNull.map((item:string)=>{
        return Boolean(state[item])
    }).filter((item:boolean)=>item).length==notNull.length

    const reloadPage = () => {
        window.location.reload();
    }


    useEffect(()=>{
        if(type!=addKey)
            setState(defaultData)
    },[defaultData])

    return <Box sx={{padding:'15px'}}>
    {Object.keys(title).map((key:string)=>{
        const item = title[key]
        if(hide.includes(key))
            return  <></>
        return <Box sx={{
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
        if([addKey,editKey].includes(type))
        {
            if(notNullHasData){
                if(type==addKey){
                    const insertData: Record<string, any> = {};
                    Object.keys(state).map(key=>{
                        const value = numberData.includes(key)?
                                        Number(state[key]):
                                        booleanData.includes(key)?
                                        Boolean(state[key]):
                                        state[key]
                        insertData[key] = value
                    })
                    post(path,insertData)
                    reloadPage();
                }
                else{
                    const updateData = {
                        where:{id:Number(defaultData['id'])},
                        data: {} as Record<string, any>
                }
                Object.keys(state).map(key=>{
                    if(defaultData[key]!=state[key])
                    {
                        const value = numberData.includes(key)?
                        Number(state[key]):
                        booleanData.includes(key)?
                        Boolean(state[key]):
                        state[key]

                        updateData['data'][key] = value
                    }
                        
                })
                    post(path,updateData)
                    reloadPage();
                }
            }else{

            }
        }
        else{
            post(path,{where:{id:Number(defaultData['id'])}})
            reloadPage();
        }

        closeDialog(type)
    }} >{buttonText}</MyButton>

<MyButton style={{color:notNullHasData?'black':'gray'}} onClick={()=>{

    closeDialog(type)

    }} >取消</MyButton>


    </Box>
    </Box>
}
