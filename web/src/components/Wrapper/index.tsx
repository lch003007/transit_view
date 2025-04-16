'use client'
import Loading from "@/app/loading";
import { ReactNode } from "react";

export default function Wrapper({children,isLoading=false}:{children:ReactNode,isLoading:boolean}){
    return <>{isLoading?<Loading/>:<>{children}</>}</>
}