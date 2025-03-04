'use client'
import { ItemPickerContext } from "@/contexts/ItemPickerContext"
import useApi from "@/hooks/useApi"
import { useContext } from "react"
import MyBox from "../MyBox"
import { MyButton } from "../MyInput"

export default function DeleteGroup({path}:{path:string}){
    const {group} = useContext(ItemPickerContext)
    const {post} = useApi()

    return <MyBox>
        
        <MyButton onClick={()=>{
            post(path,{
                where:{
                    id:group,
                }
            })
            window.location.reload()
        }}>確定</MyButton>
    </MyBox>
}