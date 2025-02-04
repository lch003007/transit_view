'use client';
import { useState,createContext } from "react";

const DialogContext = createContext<{
    openDialog:any;
    closeDialog:any;
    getOpen:any;
    keys:any;
  }>({
    openDialog:()=>{},
    closeDialog:()=>{},
    getOpen:()=>{},
    keys:{}
  });

function DialogProvider({children}:any){
    
    const [open,setOpen] = useState<any>({})
    return <DialogContext.Provider
    value={{
        openDialog:(key:string)=>{
            setOpen((prevData:any)=>({...prevData,[key]:true}))
        },
        closeDialog:(key:string)=>{
            setOpen((prevData:any)=>({...prevData,[key]:false}))
        },
        getOpen:(key:string)=>{
            return open[key]
        },
        keys:{
            addKey:'formAdd',
            deleteKey:'formDelete',
            editKey:'formEdit',
            panelKey:'panelEdit',
            panelGroupKey:'panelGroup',
            cctvGroupKey:'cctvGroup',
            panelDeleteKey:'deletePanelGroup',
            addTravelTimeKey:'addTravelTimeKey',
            editTravelTimeKey:'editTravelTimeKey',
            deleteTravelTimeKey:'deleteTravelTimeKey'
        }
    }}
    >
        {children}
    </DialogContext.Provider>
}

export {DialogContext,DialogProvider}