'use client'
import { MyButton } from "@/components/MyInput";
import { deleteCookie } from "cookies-next";

export default function Logout(){
    return         <MyButton onClick={()=>{
        deleteCookie('jwt')
        deleteCookie('auth')
        window.location.reload()
    }}>登出</MyButton>
}