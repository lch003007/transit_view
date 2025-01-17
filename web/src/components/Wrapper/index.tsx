'use client'
import Loading from "@/app/loading";

export default function Wrapper({children,isLoading=false}:any){
    return <>{isLoading?<Loading/>:<>{children}</>}</>
}