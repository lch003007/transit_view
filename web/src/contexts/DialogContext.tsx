'use client';
import { useState,createContext, ReactNode } from "react";

const DialogContext = createContext<{
    openDialog:(key:string)=>void;
    closeDialog:(key:string)=>void;
    getOpen:(key:string)=>boolean;
    keys:Record<string,string>;
  }>({
    openDialog:()=>{},
    closeDialog:()=>{},
    getOpen:()=>{return true},
    keys:{}
  });

function DialogProvider({children}:{children:ReactNode}){
    
    const [open,setOpen] = useState<Record<string,boolean>>({})
    return <DialogContext.Provider
    value={{
        openDialog:(key:string)=>{
            setOpen((prevData:Record<string,boolean>)=>({...prevData,[key]:true}))
        },
        closeDialog:(key:string)=>{
            setOpen((prevData:Record<string,boolean>)=>({...prevData,[key]:false}))
        },
        getOpen:(key:string)=>{
            return open[key]==undefined?false:open[key]
        },
        keys:{
            addKey:'formAdd',
            deleteKey:'formDelete',
            editKey:'formEdit',
            panelKey:'panelEdit',
            panelGroupKey:'panelGroup',
            panelGroupSaveAsKey:'panelGroupSaveAs',
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