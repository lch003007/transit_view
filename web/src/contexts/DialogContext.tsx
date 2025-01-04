'use client';
import { useState,createContext,Dispatch,SetStateAction } from "react";

const DialogContext = createContext<{
    openDialog:any;
    closeDialog:any;
    getOpen:any;
  }>({
    openDialog:()=>{},
    closeDialog:()=>{},
    getOpen:()=>{}
  });

function DialogProvider({children}:any){
    const [open,setOpen] = useState<any>({})
    return <DialogContext.Provider
    value={{
        openDialog:(key:string)=>{
            setOpen((prevData:any)=>({...prevData,[key]:true}))
        },
        closeDialog:(key:string)=>{
            console.log(key)
            setOpen((prevData:any)=>({...prevData,[key]:false}))
        },
        getOpen:(key:string)=>{
            return open[key]
        }
    }}
    >
        {children}
    </DialogContext.Provider>
}

export {DialogContext,DialogProvider}